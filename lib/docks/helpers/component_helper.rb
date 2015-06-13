module Docks
  module Helpers
    module Component
      def unique_iframe_id
        @iframe_id ||= 0
        @iframe_id += 1
        "iframe--#{@iframe_id}"
      end

      def docks_icons
        # html safe
        File.read(Docks.config.destination + File.join("images", "icons.svg"))
      end

      def docks_icon(name, options = {})
        klass = "icon"

        size = options.delete(:size)
        klass << " icon--#{size}" unless size.nil?

        color = options.delete(:color)
        klass << " icon--#{color.to_s.gsub("_", "-")}" unless color.nil?

        "<svg class='#{klass}'><use xlink:href='#icon--#{name}'></use></svg"
      end

      %w(
        avatar
        select
        code_block
        button
        demo
        tablist
        tablist_tab
        tablist_panel
        resizable
        toggle
        toggle_container
        details_sheet
        exploded
        popover
        xray
        iframe
        table
      ).each do |component_name|
        define_method "docks_#{component_name}".to_sym do |opts = {}, &block|
          if block.nil?
            docks_component(component_name, opts)
          else
            concat docks_component(component_name, opts, &block)
          end
        end
      end

      class Component
        attr_reader :block
        attr_accessor :_attributes

        def initialize(opts = {}, &block)
          @classes = Component.standardize_classes(opts.delete(:classes))
          @_attributes = opts
          @block = block
        end

        def config
          yield Config.new(self)
        end

        alias_method :configure, :config

        def method_missing(meth, *args)
           @_attributes.key?(meth) ? @_attributes[meth] : super
        end

        def respond_to?(meth)
          @_attributes.has_key?(meth) || super
        end

        def classes_for(subcomponent = :base)
          @classes.fetch(subcomponent, []).join(" ")
        end

        alias_method :classes, :classes_for

        def ==(other)
          self.class == other.class && @classes == other.instance_variable_get(:@classes) && @_attributes == other.instance_variable_get(:@_attributes)
        end

        def to_s
          @_attributes.to_s
        end

        def inspect
          to_s
        end

        private

        def self.standardize_classes(classes, base_component = :base)
          return {} if classes.nil?

          if classes.kind_of?(Hash)
            classes.each do |key, klass|
              classes[key] = klass.kind_of?(String) ? klass.split(" ") : klass
            end
          else
            classes = classes.kind_of?(String) ? classes.split(" ") : classes
            class_hash = {}
            class_hash[base_component] = classes

            classes = class_hash
          end

          classes
        end

        class Config
          def initialize(component)
            @component = component
          end

          def defaults(opts = {})
            @component._attributes.merge!(opts) do |key, passed, default|
              passed.nil? ? default : passed
            end
          end

          def classes(default_classes = {})
            default_classes = Component.standardize_classes(default_classes)
            @component.instance_variable_get(:@classes).merge!(default_classes) do |key, passed, default|
              passed.concat(default).uniq
            end
          end

          def conditional_classes(opts)
            if (attribute = opts.delete(:if))
              classes(opts) if @component.respond_to?(attribute) && !!@component.send(attribute)
            elsif (attribute = opts.delete(:unless))
              classes(opts) if !@component.respond_to?(attribute) || !@component.send(attribute)
            elsif (attribute = opts.delete(:with))
              return unless block_given?
              classes(yield @component.send(attribute))
            elsif (attribute = opts.delete(:from))
              return unless @component.respond_to?(attribute)
              classes(opts.fetch(@component.send(attribute), nil))
            end
          end
        end
      end

      # NOT WORKING
      class Tablist
        def tab(*args); Docks.current_renderer.docks_tablist_tab(*args) end
      end

      private

      def docks_component(name, opts = {}, &block)
        render Docks.component_template_path + name, component: Component.new(opts, &block)
      end
    end
  end
end
