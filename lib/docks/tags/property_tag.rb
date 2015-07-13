module Docks
  module Tags
    class Property < Base
      def initialize
        @name = :property
        @multiline = false
      end

      def process(symbol)
        symbol[@name] = true
        Containers::Variable.from_symbol(symbol)
      end
    end
  end
end
