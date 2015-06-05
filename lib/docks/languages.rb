require "set"

module Docks
  module Types
    module Languages
      MARKUP      = :markup
      SCRIPT      = :script
      STYLE       = :style
      STUB        = :stub
      DESCRIPTION = :description
    end
  end

  module Languages
    @@languages = Hash.new
    @@bundled_languages = nil
    @@extensions = Types::Languages.constants.inject(Hash.new) do |exts, const|
      exts[Types::Languages.const_get(const)] = Set.new
      exts
    end


    # Public: Registers all of the bundled languages.
    # Returns nothing.

    def self.register_bundled_languages
      bundled_languages.each { |language| register(language) }
    end


    # Public: Registers a language. This will add all of that language's
    # extensions to the list of extensions and associate the language with
    # that extension.
    #
    # language - The language class to register. This class should inherit from
    #            Docks::Tags::Base.
    #
    # Returns a Boolean indicating whether or not the language was registered.

    def self.register(language)
      Array(language.extensions).each do |extension|
        @@extensions[language.type].add(extension)
        @@languages[extension] = language
      end

      Array(language.symbol_sources).each do |source|
        SymbolSources.register(source)
      end
    end


    # Public: Returns an Array of extensions that have had a language registered
    # for them.

    def self.extensions
      @@extensions.values.inject([]) { |all, all_of_type| all.concat(all_of_type.to_a) }
    end


    # For each type of file (in Docks::Types::Languages), creates a method that
    # returns an Array of all extensions whose language is a language of that
    # type.

    Docks::Types::Languages.constants.each do |const|
      type = Docks::Types::Languages.const_get(const)
      define_singleton_method("#{type}_extensions") { @@extensions[type].to_a }
    end


    # Public: Gets the language associated with the passed filename.
    #
    # file - The filename (or something that responds to `to_s` to provide a
    #        filename) to get the language for.
    #
    # Returns a language instance or, if no language exists for the passed file,
    # nil.

    def self.language_for(file)
      language = @@languages[extension_for_file(file)]
      language.nil? ? nil : language.instance
    end

    def self.most_common_markup_language
      markup_files = Group.source_files_of_type(Types::Languages::MARKUP)
      return if markup_files.empty?
      most_common = markup_files.map { |file| extension_for_file(file) }.group_by { |ext| ext }.values.max_by(&:size).first
      language_for(most_common)
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
          type = extensions_type
          break
        end
      end

      type
    end


    # Public: Determines whether the passed file is a file type supported by
    # the languages that have been registered.
    #
    # file - The file to check.
    #
    # Returns true if the file has an associated language, otherwise false.

    def self.supported_file?(file)
      extensions.include?(extension_for_file(file))
    end


    # Public: Gets the extension (without a leading period) for the passed file.
    #
    # file - the file whose extension should be retrieved
    #
    # Returns a string of the file's extension.

    def self.extension_for_file(file)
      file.to_s.split(".").last
    end



    private

    # Private: Returns an Array of all bundled language classes.

    def self.bundled_languages
      if @@bundled_languages.nil?
        bundled = constants.select do |const|
          klass = const_get(const)
          Class === klass && !(klass.eql?(Base))
        end

        @@bundled_languages = bundled.map { |const| const_get(const) }
      end

      @@bundled_languages
    end


    # Private: Clears all registered languages.
    # Returns nothing.

    def self.clean
      @@extensions.each_key do |type|
        @@extensions[type] = Set.new
      end

      @@languages = Hash.new
    end
  end
end
