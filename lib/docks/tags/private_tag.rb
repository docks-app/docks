module Docks
  module Tags
    class Private < Base
      def initialize
        @name = :private
        @multiline = false
      end

      def process(symbol)
        symbol.delete(@name)
        symbol[Access] = Docks::Types::Access::PRIVATE
      end
    end
  end
end
