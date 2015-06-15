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
    def self.language_for(file)
      language = @languages[extension_for_file(file)]
      language.nil? ? nil : language.instance
    end

    def self.register_bundled_languages
      bundled_languages.each { |language| register(language) }
    end

    def self.register(language)
      Array(language.extensions).each do |extension|
        @extensions[language.type].add(extension)
        @languages[extension] = language
      end

      Array(language.symbol_sources).each do |source|
        SymbolSources.register(source)
      end
    end

    def self.<<(language)
      register(language)
    end

    def self.extensions
      @extensions.values.inject([]) { |all, all_of_type| all.concat(all_of_type.to_a) }
    end

    Docks::Types::Languages.constants.each do |const|
      type = Docks::Types::Languages.const_get(const)
      define_singleton_method("#{type}_extensions") { @extensions[type].to_a }
    end

    def self.most_common_markup_language
      markup_files = Group.source_files_of_type(Types::Languages::MARKUP)
      return if markup_files.empty?
      most_common = markup_files.map { |file| extension_for_file(file) }.group_by { |ext| ext }.values.max_by(&:size).first
      language_for(most_common)
    end

    def self.file_type(file)
      extension = extension_for_file(file)
      type = nil

      @extensions.each do |extensions_type, the_extensions|
        if the_extensions.include?(extension)
          type = extensions_type
          break
        end
      end

      type
    end

    def self.supported_file?(file)
      extensions.include?(extension_for_file(file))
    end

    def self.extension_for_file(file)
      file.to_s.split(".").last
    end

    private

    def self.bundled_languages
      if @bundled_languages.nil?
        bundled = constants.select do |const|
          klass = const_get(const)
          Class === klass && !(klass.eql?(Base))
        end

        @bundled_languages = bundled.map { |const| const_get(const) }
      end

      @bundled_languages
    end

    def self.clean
      @languages = Hash.new
      @bundled_languages = nil
      @extensions = Types::Languages.constants.inject(Hash.new) do |exts, const|
        exts[Types::Languages.const_get(const)] = Set.new
        exts
      end
    end

    clean
  end
end
