module Docks
  module Types
    module Access
      PUBLIC      = "public"
      PRIVATE     = "private"
    end
  end

  module Tags

    # Public: The tag attributes for `@access`.
    #
    # Specifies whether or not there is a restriction on access to this
    # symbol. The value assigned to this tag must be either `public` or
    # `private`. No default value is assumed.

    class Access < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@access` name for use in documentation, and will allow only a single
      # line of documentation to be included in the tag.

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
