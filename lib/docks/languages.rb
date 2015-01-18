require "set"

module Docks
  class Languages
    def self.default_language; "html" end

    @@extensions = {}
    Docks::Types::Languages.constants.each do |const|
      @@extensions[Docks::Types::Languages.const_get(const)] = Set.new
    end



    def self.register_bundled_languages
      Docks::Language.bundled_languages.each do |language|
        [language.extensions].flatten.each do |extension|
          @@extensions[language.type].add(extension)
        end
      end
    end

    def self.extensions
      @@extensions.values.inject([]) { |all, all_of_type| all.concat(all_of_type) }
    end

    Docks::Types::Languages.constants.each do |const|
      type = Docks::Types::Languages.const_get(const)
      define_method("#{type}_extensions") { @@extensions[type].to_a }
    end

    def self.is_supported_file_type?(file)
      extensions.include?(extension_for_file(file))
    end






    # Public: Determines the type of file (script, markup, or style) that has
    # been passed based on that file's extension and the currently registered
    # languages.
    #
    # file - The file whose type should be evaluated.
    #
    # Returns the type that was registered with the first language whose extension
    # matches that of the file, or nil if the file is not a supported file type.

    def self.file_type(file)
      extension = extension_for_file(file)
      type = nil

      @@extensions.each do |extensions_type, the_extensions|
        if the_extensions.include?(extension)
          type = extension_type
          break
        end
      end

      type
    end




    # Public: Returns the parser that has been registered for the passed file.
    #
    # file - The file whose parser should be retrieved.
    #
    # Returns the parser for the passed file, or nil if no parser has been registered
    # with that extension.

    def self.parser_for(file)
      extension = extension_for_file(file)
      parser = nil

      @@details.each_value do |language_detail|
        if language_detail[:extension] == extension
          parser = language_detail[:parser]
          break
        end
      end

      parser
    end




    # Public: Gets the default language.
    # Returns a String with the default language (for any item that requires
    # a language but where it is optional to actually provide one).



    def self.load_stub_for(file)
      extension = extension_for_file(file)
      stub = nil

      @@details.each_value do |language_detail|
        if language_detail[:extension] == extension
          stub = language_detail[:stub_loader].call(file)
          break
        end
      end

      stub
    end



    private

    # Private: Clears all registered languages.
    # Returns nothing.

    def self.clear_languages
      @@extensions.each_key do |type|
        @@extensions[type] = Set.new
      end
    end



    # Private: Gets the extension (without a leading period) for the passed file.
    #
    # file - the file whose extension should be retrieved
    #
    # Returns a string of the file's extension.

    def self.extension_for_file(file)
      File.extname(file)[1..-1]
    end

  end
end
