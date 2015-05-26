module Docks
  module SymbolSources
    @@sources = []

    def self.register(source)
      @@sources << source unless @@sources.include?(source)
    end

    def self.register_bundled_symbol_sources
      register(MDN)
      register(JQuery)
    end

    def self.path_for(symbol)
      @@sources.each do |source|
        source = source.new
        return source.path_for(symbol) if source.recognizes?(symbol)
      end

      nil
    end

    private

    def self.clear
      @@sources = []
    end

    public

    class Base
      def recognizes?(symbol); false end
      def path_for(symbol); nil end
    end

    class MDN < Base
      GLOBAL_SYMBOLS = %w(
        object function boolean symbol number date string regexp map set weakmap weakset arguments undefined
        error evalerror internalerror rangeerror referenceerror syntaxerror typeerror urierror
        array int8array uint8array uint8clampedarray int16array uint16array int32array uint32array float32array float64array
        promise generator generatorfunction proxy iterator
      )

      GLOBAL_SYMBOL_URL = "https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects"

      def recognizes?(symbol)
        GLOBAL_SYMBOLS.include?(symbol.to_s.downcase)
      end

      def path_for(symbol)
        "#{GLOBAL_SYMBOL_URL}/#{symbol}"
      end
    end

    class JQuery < Base
      def recognizes?(symbol); symbol.downcase == "jquery" end
      def path_for(symbol); "http://api.jquery.com/" end
    end
  end
end
