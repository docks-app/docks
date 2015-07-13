module Docks
  module Tags
    class DemoType < Base
      def initialize
        @name = :demo_type
        @multiline = false
      end

      def process(symbol)
        symbol.update(@name) { |demo_type| ensure_valid_demo_type(demo_type) }
      end
    end
  end
end
