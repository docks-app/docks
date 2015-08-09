require_relative "../components.rb"

module Docks
  module Helpers
    module UI
      def unique_iframe_id
        @iframe_id ||= 0
        @iframe_id += 1
        "iframe--#{@iframe_id}"
      end

      def docks_icons
        # html safe
        File.read(Assets.path_for("images/icons.svg"))
      end

      def docks_icon(name, options = {})
        klass = "icon"

        size = options.delete(:size)
        klass << " icon--#{size}" unless size.nil?

        color = options.delete(:color)
        klass << " icon--#{color.to_s.gsub("_", "-")}" unless color.nil?

        "<svg class='#{klass}'><use xlink:href='#icon--#{name}'></use></svg>"
      end

      def docks_demo(demo, locals = {})
        locals[:id] ||= unique_iframe_id
        locals[:demo] = demo
        render(Templates.demo.path, layout: Templates.demo.layout, locals: locals)
      end

      %w(
        avatar
        select
        code_block
        button
        tablist
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
          docks_component(component_name, opts, &block)
        end
      end

      def docks_component(name, opts = {}, &block)
        locals = {}
        locals[name.to_s.split(":").last.to_sym] = locals[:component] = Docks::Components.component_for(name).new(self, opts, &block)

        if block.nil?
          render(Components.template_path(name), locals)
        else
          concat render(Components.template_path(name), locals)
        end
      end
    end
  end
end
