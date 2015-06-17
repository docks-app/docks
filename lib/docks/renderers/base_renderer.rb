module Docks
  module Renderers
    class Base
      def initialize; @cache = {} end

      def render(template, locals = {})
        raise NotImplementedError.new("You must provide a `render` method.")
      end

      def ivars=(ivars)
        ivars.each do |ivar, value|
          instance_variable_set("@#{ivar}".to_sym, value)
        end
      end

      private

      def normalize_content_and_locals(template, locals = {})
        content = nil
        layout = nil
        must_be_partial = false

        if template.kind_of?(Hash)
          locals = template.fetch(:locals, {})
          content = template.fetch(:inline, nil)
          layout = template.fetch(:layout, nil) || nil # guard against false layouts

          if template[:partial].nil?
            template = template[:template]
          else
            template = template[:partial]
            must_be_partial = true
          end
        else
          layout = locals.delete(:layout)
          layout = nil unless layout
          locals = locals.delete(:locals) if locals.key?(:locals)
        end

        if content.nil?
          options = {}
          options[:must_be] = :partial if must_be_partial

          found_template = Templates.search_for_template(template, options)
          content = @cache[found_template] || File.read(found_template)
          @cache[found_template] = content
        end

        if layout
          found_layout = Templates.search_for_template(layout, must_be: :layout)
          layout = @cache[found_layout] || File.read(found_layout)
          @cache[found_layout] = layout
        end

        return content, layout, locals
      end

      def clean; @cache = {} end
    end
  end

  def self.current_renderer; @current_renderer end
  def self.current_renderer=(renderer); @current_renderer = renderer end
end
