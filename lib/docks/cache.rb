require_relative "languages.rb"
require_relative "version.rb"

module Docks
  class Cache
    PARSE_RESULT_TYPES = [
      Docks::Types::Languages::STYLE,
      Docks::Types::Languages::MARKUP,
      Docks::Types::Languages::SCRIPT
    ]

    DIR = "docks_cache"
    GROUP_FILE = "docks_cache_groups"
    META_FILE = "docks_meta"

    def self.pattern_for(pattern)
      pattern = pattern.to_s
      cache_file = File.join(Docks.config.cache_location, pattern)

      unless File.exists?(cache_file)
        raise Docks::NoPatternError, "No pattern by the name of '#{pattern}' exists. Make sure you have a script, markup, or style file with that filename that is included in your 'docks_config' source directories."
      end

      Docks::Containers::Pattern.new(YAML::load_file(cache_file))
    end

    def self.pattern_groups
      patterns = {}

      if File.exists?(group_cache_file)
        YAML::load_file(group_cache_file).each_value do |details|
          group = details.delete(:group)
          patterns[group] ||= []
          patterns[group] << details
        end
      end

      patterns
    end

    private

    def self.group_cache_file
      File.join(Docks.config.cache_location, GROUP_FILE)
    end

    def self.meta_file
      File.join(Docks.config.cache_location, META_FILE)
    end



    public

    def initialize
      FileUtils.mkdir_p(Docks.config.cache_location)
      load_metadata
      load_group_cache
    end

    def clear
      FileUtils.rm_rf Dir[Docks.config.cache_location + "*"]
    end

    def <<(parse_result)
      return unless pattern_is_valid?(parse_result)

      id = parse_result[:name].to_s

      File.open(Docks.config.cache_location + id, 'w') do |file|
        file.write(parse_result.to_yaml)
      end

      @new_group_cache[id] = group_details(parse_result)
    end

    # When a pattern exists but did not need to be re-parsed, this needs to
    # be communicated so that we can keep track of what patterns still exist.
    def no_update(id)
      id = id.to_s
      @new_group_cache[id] = @old_group_cache[id]
    end


    def dump
      File.open(self.class.group_cache_file, "w") do |file|
        file.write(@new_group_cache.to_yaml)
      end

      File.open(self.class.meta_file, "w") do |file|
        file.write(@metadata.to_yaml)
      end

      # Clear out anything that didn't get written to the new cache
      @old_group_cache.keys.each do |id|
        FileUtils.rm_rf(Docks.config.cache_location + id.to_s) if @new_group_cache[id].nil?
      end
    end

    private

    def pattern_is_valid?(parse_results)
      !parse_results[:description].nil? || PARSE_RESULT_TYPES.any? { |parse_result_type| !parse_results[parse_result_type].empty? }
    end

    def load_metadata
      if File.exists?(self.class.meta_file)
        @metadata = YAML::load_file(self.class.meta_file) || Hash.new
      else
        @metadata = Hash.new
      end

      clear if !@metadata[:version].nil? && @metadata[:version] != VERSION
      @metadata[:version] = VERSION
    end

    def load_group_cache
      if File.exists?(self.class.group_cache_file)
        @old_group_cache = YAML::load_file(self.class.group_cache_file) || Hash.new
      else
        @old_group_cache = Hash.new
      end

      @new_group_cache = Hash.new
    end

    def group_details(parse_results)
      name = parse_results[:name]
      pattern_block = parse_results[:pattern]

      {
        name: name,
        title: pattern_block[:title] || name.capitalize,
        group: pattern_block[:group] || Docks::Types::Symbol::COMPONENT.capitalize
      }
    end
  end
end
