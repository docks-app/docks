module Docks
  module Tags

    # Public: The tag attributes for `@private`.
    #
    # This tag specifies that the symbol should be treated as private. This is
    # mostly useful for symbols marked as a method by the `@method` tag — a
    # method marked as such will be treated as a method directly on the attached
    # class or factory, rather than on an instance.

    class Private < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@private` name for use in documentation, and will allow only a single
      # line of documentation to be included in the tag.

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
