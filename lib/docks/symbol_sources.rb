module Docks
  module SymbolSources
    @sources = []

    def self.register(source)
      source = source.instance
      @sources << source unless @sources.include?(source)
    end

    def self.<<(source)
      register(source)
    end

    def self.path_for(symbol, options = {})
      @sources.each do |source|
        return source.path_for(symbol) if source.recognizes?(symbol, options)
      end

      nil
    end

    private

    def self.clear
      @sources = []
    end
  end
end
