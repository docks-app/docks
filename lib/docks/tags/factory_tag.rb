module Docks
  module Tags
    class Factory < Base
      def initialize
        @name = :factory
        @multiline = false
      end

      def process(symbol)
        symbol[@name] = true
        symbol.symbol_type = Types::Symbol::FACTORY
        Containers::Factory.from_symbol(symbol)
      end
    end
  end
end
