module Docks
  module Renderers
    class Base
      include Singleton
      attr_writer :helper_files

      def initialize
        @cache = {}
      end

      private

      def normalize_content_and_locals(template, locals = {})
        content = nil
        must_be_partial = false

        if template.kind_of?(Hash)
          locals = template[:locals] || {}
          content = template[:inline]
          template = template[:partial]
          must_be_partial = true
        end

        if content.nil?
          found_template = Renderers.search_for_template(template, must_be_partial: must_be_partial)
          raise Docks::NoTemplateError, "No template matching '#{template}' was found. Make sure that you have a template by that name in the 'templates' folder of your pattern library's assets (or in a subdirectory of that folder)." if found_template.nil?
          content = @cache[found_template] || File.read(found_template)
          @cache[found_template] = content
        end

        return content, locals
      end

      def clean
        @cache = {}
      end
    end

    def self.search_for_template(template, options = {})
      return template if File.exists?(template)

      loose_template = loose_search_for(template)
      return loose_template unless loose_template.nil?

      unless options[:must_be_partial]
        in_root = loose_search_for(File.join(Docks.config.library_assets, "templates", template))
        return in_root unless in_root.nil?
      end

      in_partials = loose_search_for(File.join(Docks.config.library_assets, "templates", "partials", template))
      return in_partials unless in_partials.nil?
    end

    def self.loose_search_for(path)
      return if path.nil?
      path_pieces = path.split(".").first.split("/")
      path_pieces[path_pieces.length - 1] = "{_,}#{path_pieces.last}"
      Dir.glob("#{path_pieces.join("/")}.*").first
    end
  end
end
