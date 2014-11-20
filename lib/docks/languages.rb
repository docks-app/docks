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
      @@extensions = nil
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
      if @@extensions.nil?
        extensions = @@details.values.map { |language| language[:extension] }
        @@extensions = extensions.compact.uniq
      end

      @@extensions
    end

    def self.file_type(file)
      extension = extension_for_file(file)
      type = nil

      @@details.each_value do |language_detail|
        if language_detail[:extension] == extension
          type = language_detail[:type]
          break
        end
      end

      type
    end

    def self.is_supported_file_type?(file)
      extensions.include?(extension_for_file(file))
    end

    def self.parser_for(file)
      extension = extension_for_file(file)
      parser = nil

      @@details.each_value do |language_detail|
        if language_detail[:extension] == extension
          parser = language_detail[:parser]
        end
      end

      parser
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

    def self.extension_for_file(file)
      File.extname(file)[1..-1]
    end

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
