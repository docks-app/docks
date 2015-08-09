module Docks
  module Tags
    class Object < Base
      def initialize
        @name = :object
        @multiline = false
      end

      def process(symbol)
        symbol[@name] = true
        symbol.type = "Object"
      end
    end
  end
end
