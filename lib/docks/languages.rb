module Docks
  class Languages
    @@default_language = 'html'
    @@details = {}



    # Public: Registers a language. This will overwrite any previously registered
    # languages of the same name. A new, default details Hash will be created for the
    # symbol.
    #
    # language - The language to register.
    #
    # Yields nothing to the passed block, but the block will be evaluated
    # in the context of this class and, as such, have access to all the private
    # registration methods (::extension, ::parser, and ::type).
    #
    # Returns nothing.

    def self.register(language, &block)
      @@extensions = nil
      @@details[language] = {
        parser: nil,
        extension: nil,
        type: nil,
        stub_loader: nil
      }
      @@current_language = language
      @@current_details = @@details[language]
      class_eval(&block) if block_given?
    end



    # Public: Gets all extensions that have been registered.
    # Returns an Array of Strings representing the accepted extensions.

    def self.extensions
      if @@extensions.nil?
        extensions = @@details.values.map { |language| language[:extension] }
        @@extensions = extensions.compact.uniq
      end

      @@extensions
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

      @@details.each_value do |language_detail|
        if language_detail[:extension] == extension
          type = language_detail[:type]
          break
        end
      end

      type
    end



    # Public: Determines whether the passed file has a language with a matching
    # extension that has been registered.
    #
    # file - The file whose type should be evaluated.
    #
    # Returns a boolean indicating whether the file is a supported type.

    def self.is_supported_file_type?(file)
      extensions.include?(extension_for_file(file))
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



    # Public: Gets all extensions that have been registered with a markup type.
    # Returns an Array of Strings representing the relevant extensions.

    def self.markup_extensions; extensions_of_type(Docks::Types::Languages::MARKUP) end



    # Public: Gets all extensions that have been registered with a script type.
    # Returns an Array of Strings representing the relevant extensions.

    def self.script_extensions; extensions_of_type(Docks::Types::Languages::SCRIPT) end



    # Public: Gets all extensions that have been registered with a style type.
    # Returns an Array of Strings representing the relevant extensions.

    def self.style_extensions; extensions_of_type(Docks::Types::Languages::STYLE) end



    # Public: Gets the default language.
    # Returns a String with the default language (for any item that requires
    # a language but where it is optional to actually provide one).

    def self.default_language; @@default_language end



    # Public: Registers all lanugages that are bundled as part of the gem.
    # Returns nothing.

    def self.register_bundled_languages
      Dir[File.join(File.dirname(__FILE__), 'languages/*.rb')].each do |file|
        class_eval(File.read(file))
      end
    end



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
      @@details = {}
    end



    # Private: Gets the extension (without a leading period) for the passed file.
    #
    # file - the file whose extension should be retrieved
    #
    # Returns a string of the file's extension.

    def self.extension_for_file(file)
      File.extname(file)[1..-1]
    end



    # Private: Registers a parser for the extension that is currently being
    # registered by `::register`.
    #
    # parser - The parser (class conforming to Docks::Parsers::Base) to use for
    #          this language.
    #
    # Returns nothing.

    def self.parser(parser)
      @@current_details[:parser] = parser
    end



    # Private: Registers a file name extensions for the language that is currently being
    # registered by `::register`.
    #
    # extension - The extension (as a String) to use for this language.
    #
    # Returns nothing.

    def self.extension(extension)
      @@current_details[:extension] = extension
    end



    # Private: Registers a type (script, style, or markup) for the language that
    # is currently being registered by `::register`.
    #
    # type - The type (should be a constant under Docks::Types::Languages) to use
    #        for this language.
    #
    # Returns nothing.

    def self.type(type)
      @@current_details[:type] = type
    end



    # Private: Gets all extensions for languages that have been registered with
    # the passed type.
    #
    # type - The type (should be a constant under Docks::Types::Languages) for
    #        which extensions should be retrieved.
    #
    # Returns an Array of Strings representing the extensions for languages whose
    # registered type matches `type`.

    def self.extensions_of_type(type)
      extensions = []
      @@details.values.each do |language|
        extensions << language[:extension] if language[:type] == type
      end

      extensions.compact.uniq
    end



    def self.stub_loader(&block)
      @@current_details[:stub_loader] = block
    end

  end
end
