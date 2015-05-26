require_relative "languages.rb"
require_relative "version.rb"
# require_relative "helpers/url_helper.rb"

module Docks
  class Cache
    PARSE_RESULT_TYPES = [
      Docks::Types::Languages::STYLE,
      Docks::Types::Languages::MARKUP,
      Docks::Types::Languages::SCRIPT
    ]

    DIR = "docks_cache"
    META_FILE = "docks_meta"
    PATTERN_LIBRARY_FILE = "docks_pattern_library"

    def self.pattern_for(pattern)
      pattern = pattern.to_s
      cache_file = File.join(Docks.config.cache_location, pattern)

      unless File.exists?(cache_file)
        raise Docks::NoPatternError, "No pattern by the name of '#{pattern}' exists. Make sure you have a script, markup, or style file with that filename that is included in your 'docks_config' source directories."
      end

      Docks::Containers::Pattern.new(Marshal::load(File.binread(cache_file)))
    end

    def self.pattern_library
      if File.exists?(pattern_library_cache_file)
        Marshal::load(File.binread(pattern_library_cache_file)) || Containers::PatternLibrary.new
      else
        Containers::PatternLibrary.new
      end
    end

    private

    def self.pattern_library_cache_file
      Docks.config.cache_location + PATTERN_LIBRARY_FILE
    end

    def self.meta_file
      Docks.config.cache_location + META_FILE
    end



    public

    def initialize
      FileUtils.mkdir_p(Docks.config.cache_location)
      load_metadata
      load_pattern_library
    end

    def clear
      FileUtils.rm_rf Dir[Docks.config.cache_location + "*"]
    end

    def <<(pattern_hash)
      pattern_summary = Containers::Pattern.summarize(pattern_hash)
      return unless pattern_summary.is_valid?

      id = pattern_summary.name.to_s

      File.open(Docks.config.cache_location + id, "wb") do |file|
        file.write Marshal::dump(pattern_hash)
      end

      @pattern_library << pattern_summary
    end

    # When a pattern exists but did not need to be re-parsed, this needs to
    # be communicated so that we can keep track of what patterns still exist.
    def no_update(id)
      id = id.to_s
      @pattern_library << @old_pattern_library[id]
    end


    def dump
      File.open(self.class.pattern_library_cache_file, "wb") do |file|
        file.write Marshal::dump(@pattern_library)
      end

      File.open(self.class.meta_file, "wb") do |file|
        file.write Marshal::dump(@metadata)
      end

      # Clear out anything that didn't get written to the new cache
      @old_pattern_library.patterns.each do |name, pattern|
        id = name.to_s
        FileUtils.rm_rf(Docks.config.cache_location + id) unless @pattern_library.has_pattern?(id)
      end
    end

    private

    def self.load_pattern_cache(&block)
      patterns = {}

      return unless File.exists?(group_cache_file)
      pattern_cache = Marshal::load(File.binread(group_cache_file))

      if block_given?
        pattern_cache.each_value(&block)
      end

      nil
    end

    def load_metadata
      if File.exists?(self.class.meta_file)
        @metadata = Marshal::load(File.binread(self.class.meta_file)) || Hash.new
      else
        @metadata = Hash.new
      end

      clear if !@metadata[:version].nil? && @metadata[:version] != VERSION
      @metadata[:version] = VERSION
    end

    def load_pattern_library
      @old_pattern_library = self.class.pattern_library
      @pattern_library = Containers::PatternLibrary.new
    end
  end
end
