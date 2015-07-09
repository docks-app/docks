module Docks
  module Tags
    class Active < Base
      def initialize
        @name = :active
        @multiline = false
      end

      def process(symbol)
        symbol.update(@name) { |active| stringy_boolean(active) }
      end
    end
  end
end
