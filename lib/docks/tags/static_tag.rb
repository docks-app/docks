module Docks
  module Tags
    class Static < Base
      def initialize
        @name = :static
        @multiline = false
      end

      def process(symbol)
        symbol[@name] = true
      end
    end
  end
end
