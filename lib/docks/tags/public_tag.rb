module Docks
  module Tags
    class Public < Base
      def initialize
        @name = :public
        @multiline = false
      end

      def process(symbol)
        symbol.delete(@name)
        symbol[Access] = Docks::Types::Access::PUBLIC
      end
    end
  end
end
