module Docks
  module Tags

    # Public: The tag attributes for `@factory`.
    #
    # This tag specifies that the symbol should be treated as a factory — that
    # is, methods and attribuets defined after it will be attached to it (as
    # they are assumed to be methods on the object returned by the factory).

    class Factory < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@factory` name for use in documentation, and will allow only a single
      # line of documentation to be included in the tag.

      def initialize
        @name = :factory
        @multiline = false
      end

      def process(symbol)
        symbol[@name] = true
        symbol.symbol_type = Types::Symbol::FACTORY
        Containers::Factory.new(symbol.to_h)
      end
    end
  end
end
