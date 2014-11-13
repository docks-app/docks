module Docks
  class Languages
    @@default_language = 'html'
    @@details = {
      html: {
        parser: nil,
        extension: 'html',
        type: nil
      }
    }

    def self.register(language, &block)
      @@details[language] = {
        parser: nil,
        extension: language.to_s,
        type: Docks::Types::Languages::MARKUP
      }
      @@current_language = language
      @@current_details = @@details[language]
      class_eval(&block)
    end

    def self.extensions
      extensions = @@details.values.map { |language| language[:extension] }
      extensions.compact.uniq
    end

    def self.markup_extensions; self.extensions_of_type(Docks::Types::Languages::MARKUP) end
    def self.script_extensions; self.extensions_of_type(Docks::Types::Languages::SCRIPT) end
    def self.style_extensions; self.extensions_of_type(Docks::Types::Languages::STYLE) end

    def self.default_language; @@default_language end

    def self.register_bundled_languages
      Dir[File.join(File.dirname(__FILE__), 'languages/*.rb')].each do |file|
        self.class_eval(File.read(file))
      end
    end

    private

    def self.parser(parser)
      @@current_details[:parser] = parser
    end

    def self.extension(extension)
      @@current_details[:extension] = extension
    end

    def self.type(type)
      @@current_details[:type] = type
    end

    def self.extensions_of_type(type)
      extensions = []
      @@detials.values.each do |language|
        extensions << language[:extension] if language[:type] == type
      end

      extensions.compact.uniq
    end
  end
end
