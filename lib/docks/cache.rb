module Docks
  class Cache
    PARSE_RESULT_TYPES = [
      Docks::Types::Languages::STYLE,
      Docks::Types::Languages::MARKUP,
      Docks::Types::Languages::SCRIPT
    ]

    @@group_cache_file = nil

    def self.pattern_for(pattern)
      Docks::Builder.build
      cache_file = File.join(Docks.configuration.cache_dir, pattern)

      if File.exists?(cache_file)
        Docks::Containers::Pattern.new(YAML::load_file(cache_file))
      else
        raise Docks::NoPatternError, "No pattern by the name of '#{pattern}' exists. Make sure you have a script, markup, or style file with that filename that is included in your 'docks_config' source directories."
      end
    end

    def self.pattern_groups
      @@group_cache_file ||= File.join(Docks.configuration.cache_dir, Docks::GROUP_CACHE_FILE)
      patterns = {}

      if File.exists?(@@group_cache_file)
        YAML::load_file(@@group_cache_file).each_value do |details|
          group = details.delete(:group)
          patterns[group] ||= []
          patterns[group] << details
        end
      end

      patterns
    end

    def initialize
      FileUtils.mkdir_p(Docks.configuration.cache_dir)
      @@group_cache_file ||= File.join(Docks.configuration.cache_dir, Docks::GROUP_CACHE_FILE)
      @group_cache = File.exists?(@@group_cache_file) ? YAML::load_file(@@group_cache_file) : {}
    end

    def <<(parse_result)
      return unless pattern_is_valid?(parse_result)

      id = parse_result[:name].to_s
      cache_file = File.join(Docks.configuration.cache_dir, id)

      File.open(cache_file, 'w') do |file|
        file.write(parse_result.to_yaml)
      end

      @group_cache[id] = group_details(parse_result)
    end

    def dump
      File.open(@@group_cache_file, "w") do |file|
        file.write(@group_cache.to_yaml)
      end
    end

    private

    def pattern_is_valid?(parse_results)
      PARSE_RESULT_TYPES.any? { |parse_result_type| !parse_results[parse_result_type].empty? }
    end

    def group_details(parse_results)
      name = parse_results[:name]
      pattern_block = parse_results[:pattern]

      {
        name: name,
        title: pattern_block[:page] || name.capitalize,
        group: pattern_block[:group] || Docks::Types::Symbol::COMPONENT.capitalize
      }
    end
  end
end
