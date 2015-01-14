module Docks
  class PatternGroup
    attr_reader :groups

    def initialize
      @groups = {}
      group_cache_file = File.join(Docks.configuration.cache_dir, Docks::GROUP_CACHE_FILE)
      if File.exists?(group_cache_file)
        patterns = YAML::load_file(group_cache_file)
        group_patterns(patterns)
      end
    end

    private

    def group_patterns(patterns)
      patterns.each_value do |details|
        group = details.delete(:group)
        @groups[group] ||= []
        @groups[group] << details
      end
    end
  end
end
