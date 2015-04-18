module Docks
  module Renderers
    class Base
      include Singleton

      def initialize; @cache = {} end

      def render(template, locals = {})
        raise NotImplementedError.new("You must provide a `render` method.")
      end

      private

      def normalize_content_and_locals(template, locals = {})
        content = nil
        layout = nil
        must_be_partial = false

        if template.kind_of?(Hash)
          locals = template[:locals] || {}
          content = template[:inline]
          layout = template[:layout]

          if template[:partial].nil?
            template = template[:template]
          else
            template = template[:partial]
            must_be_partial = true
          end
        else
          layout = locals.delete(:layout)
        end

        if content.nil?
          options = {}
          options[:must_be] = :partial if must_be_partial

          found_template = Renderers.search_for_template(template, options)
          raise Docks::NoTemplateError, "No template matching '#{template}' was found. Make sure that you have a template by that name in the 'templates' folder of your pattern library's assets (or in a subdirectory of that folder), or provide a full path to the desired template." if found_template.nil?
          content = @cache[found_template] || File.read(found_template)
          @cache[found_template] = content
        end

        unless layout.nil?
          found_layout = Renderers.search_for_template(layout, must_be: :layout)
          raise Docks::NoTemplateError, "No layout matching '#{layout}' was found. Make sure that you have a template by that name in the 'layout' folder of your pattern library's assets (or in a subdirectory of that folder), or provide a full path to the desired layout file." if found_layout.nil?
          layout = @cache[found_layout] || File.read(found_layout)
          @cache[found_layout] = layout
        end

        return content, layout, locals
      end

      def clean; @cache = {} end
    end

    def self.search_for_template(template, options = {})
      return template if File.exists?(template)

      loose_template = loose_search_for(template)
      return loose_template unless loose_template.nil?

      if options[:must_be].nil?
        in_root = loose_search_for(File.join(Docks.config.library_assets, "templates", template))
        return in_root unless in_root.nil?
      end

      in_specific = loose_search_for(File.join(Docks.config.library_assets, "templates", "#{(options[:must_be] || :partial).to_s.sub(/s$/, '')}{s,}", template))
      return in_specific unless in_specific.nil?
    end

    def self.loose_search_for(path)
      return if path.nil?
      path_pieces = path.sub(File.extname(path), "").split("/")
      path_pieces[path_pieces.length - 1] = "{_,}#{path_pieces.last}"
      Dir.glob("#{path_pieces.join("/")}.*").first
    end
  end
end
