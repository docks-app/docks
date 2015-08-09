module Docks
  module Tags
    class Klass < Base
      def initialize
        @name = :class
        @multiline = false
      end

      def process(symbol)
        symbol.symbol_type = Types::Symbol::CLASS
        symbol[@name] = true
        Containers::Klass.from_symbol(symbol)
      end
    end
  end
end
