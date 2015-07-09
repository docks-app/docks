module Docks
  module Tags
    class Method < Base
      def initialize
        @name = :method
        @multiline = false
      end

      def process(symbol)
        symbol[@name] = true
        Containers::Function.from_symbol(symbol)
      end
    end
  end
end
