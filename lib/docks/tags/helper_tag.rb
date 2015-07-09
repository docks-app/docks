module Docks
  module Tags
    class Helper < Base
      def initialize
        @name = :helper
      end

      def process(symbol)
        symbol.update(@name) { |helper| helper.join("\n") }
      end
    end
  end
end
