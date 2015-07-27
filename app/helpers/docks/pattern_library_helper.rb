module Docks
  module PatternLibraryHelper
    def details_for(symbol)
      details = {
        tags: [],
        has_tags?: false,
        has_dates?: false,
        has_only_dates?: true
      }

      contributors = symbol.contributors
      if !contributors.nil? && contributors.length > 0
        details[:tags] << :contributors
        details[:has_only_dates?] = false
      end

      unless symbol.introduced_in.nil?
        details[:tags] << :introduced_in
        details[:has_dates?] = true
      end

      if symbol.respond_to?(:modified) && !symbol.modified.nil?
        details[:tags] << :modified
        details[:has_dates?] = true
      end

      details[:has_tags?] = !details[:tags].empty?
      details
    end

    def render_everything_for(pattern)
      render_everything(pattern)

      pattern.structure_symbols.each { |symbol| render_everything(symbol) }
      pattern.behavior_symbols.each { |symbol| render_everything(symbol) }

      return
    end

    def render_everything(symbol, options = {})
      if symbol.kind_of?(Docks::Containers::Base)
        options[:language] = symbol.source.try(:language_code)
        symbol.each do |k, v|
          if k == :description && v.present?
            symbol[k] = special_description_render(v, options)
          else
            symbol[k] = render_everything(v, options)
          end
        end
      elsif symbol.kind_of?(Array)
        symbol.map! { |each_symbol| render_everything(each_symbol, options) }
      elsif symbol.kind_of?(OpenStruct)
        symbol.each do |k, v|
          if k == :description && v.present?
            symbol.description = special_description_render(v, options)
          else
            symbol.send("#{k.to_s}=".to_sym, render_everything(v, options))
          end
        end
      end

      symbol
    end

    def special_description_render(description, options = {})
      @example_count ||= 0
      description.gsub! /href\s*=\s*['"]@link\s([^'"]*)/ do |match|
        "href='#{docks_path_to($1, options)}'"
      end

      render(inline: description.gsub(/<fenced_code_block[^>]*>(.*?)<\/fenced_code_block>/m) { |match|
        @example_count += 1
        code = $1.dup
        has_demo = match.include?("data-has-demo")
        language = match.match(/data\-language=["']([^'"]*)/).captures.first

        code_details = []
        code_details << { code: code, language: language, label: "Helper" }

        if has_demo
          code_details << { code: render(inline: code, layout: false), language: "html", label: "Markup" }
        end

        docks_code_block code: code_details,
                         hideable?: has_demo,
                         id: "code-block--example-#{@example_count}",
                         demo?: has_demo
      }).html_safe
    end

    def docks_path_to(symbol, options = {})
      @path_cache ||= {}

      return @path_cache[symbol] unless @path_cache[symbol].nil?

      if search_result = @pattern.find(symbol)
        @path_cache[symbol] = "##{search_result.symbol_id}"
      elsif search_result = @pattern_library.find(symbol)
        puts search_result
        @path_cache[symbol] = docks.pattern_path(search_result.pattern.name, anchor: search_result.symbol.try(:symbol_id))
      elsif path = Docks::SymbolSources.path_for(symbol, options)
        @path_cache[symbol] = path
      end

      @path_cache[symbol]
    end

    def docks_icons
      File.read(Rails.root.join("app/assets/images/docks/icons.svg")).html_safe
    end

    def docks_icon(name, options = {})
      klass = "icon"

      size = options.delete(:size)
      klass << " icon--#{size}" unless size.nil?

      color = options.delete(:color)
      klass << " icon--#{color.to_s.gsub("_", "-")}" unless color.nil?

      content_tag(:svg, content_tag(:use, nil, "xlink:href" => "#icon--#{name}"), class: klass)
    end

    def docks_component(name, opts = {}, &block)
      render partial: "docks/components/#{name}", locals: { component: Component.new(opts, &block) }
    end

    [
      :avatar,
      :select,
      :code_block,
      :button,
      :tablist,
      :tab,
      :tab_panel,
      :resizable,
      :class_changer,
      :class_changer_container,
      :details_sheet,
      :notice,
      :exploded,
      :popover,
      :xray

    ].each do |component_name|
      define_method "docks_#{component_name}".to_sym do |opts = {}, &block|
        docks_component component_name, opts, &block
      end
    end

    class Component
      attr_reader :_classes
      attr_accessor :_attributes

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

      def initialize(opts = {}, &block)
        @_classes = Component.standardize_classes(opts.delete(:classes))
        @_attributes = opts
        @_block = block
      end

      def block
        @_block
      end

      def config
        yield Config.new(self)
      end

      def method_missing(meth, *args)
        @_attributes[meth]
      end

      def classes_for(subcomponent = :base)
        @_classes[subcomponent].join(" ")
      end

      def to_s
        @_attributes
      end

      private

      class Config
        def initialize(component)
          @component = component
        end

        def defaults(opts = {})
          @component._attributes.reverse_merge!(opts)
        end

        def classes(default_classes = {})
          default_classes = Component.standardize_classes(default_classes)
          @component._classes.merge!(default_classes) do |key, passed, default|
            passed.concat(default).uniq
          end
        end

        def conditional_classes(opts)
          if (attribute = opts.delete(:if))
            classes(opts) if @component.send(attribute).present?
          elsif (attribute = opts.delete(:unless))
            classes(opts) if @component.send(attribute).blank?
          elsif (attribute = opts.delete(:with))
            return unless block_given?
            classes(yield @component.send(attribute))
          elsif (attribute = opts.delete(:from))
            classes(opts[@component.send(attribute)])
          end
        end
      end
    end
  end
end
