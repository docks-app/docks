class Pattern
  def self.for(pattern)
    cache_file = File.join(Docks.configuration.cache_dir, pattern)
    Docks::Builder.build unless File.exists?(cache_file)

    if File.exists?(cache_file)
      Pattern.new(YAML::load_file(cache_file))
    else
      raise Docks::NoPatternError, "No pattern by the name of '#{pattern}' exists. Make sure you have a script, markup, or style file with that filename that is included in your 'docks_config' source directories."
    end
  end

  def initialize(parse_results)
    @parse_results = parse_results
  end
end
