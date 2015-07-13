module Docks
  module Types
    module Access
      PUBLIC      = "public"
      PRIVATE     = "private"
    end
  end

  module Tags
    class Access < Base
      def initialize
        @name = :access
        @multiline = false

        @access_types = Docks::Types::Access.constants.map do |const|
          Docks::Types::Access.const_get(const)
        end
      end

      def process(symbol)
        symbol.update(@name) do |access|
          @access_types.include?(access) ? access : Docks::Types::Access::PUBLIC
        end
      end
    end
  end
end
