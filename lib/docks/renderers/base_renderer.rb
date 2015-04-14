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
          template = Renderers.search_for_template(template, must_be_partial: must_be_partial)
          return if template.nil?
          content = @cache[template] || File.read(template)
          @cache[template] = content
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
        in_root = loose_search_for(File.join(Docks.config.root, template))
        return in_root unless in_root.nil?
      end

      in_partials = loose_search_for(File.join(Docks.config.partials_dir, template))
      return in_partials unless in_partials.nil?

      Messenger.error("No template by the name of '#{template}' could be found.")
    end

    def self.loose_search_for(path)
      return if path.nil?
      path_pieces = path.split(".").first.split("/")
      path_pieces[path_pieces.length - 1] = "{_,}#{path_pieces.last}"
      Dir.glob("#{path_pieces.join("/")}.*").first
    end
  end
end
