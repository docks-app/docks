module Docks
  module Tags

    # Public: The tag attributes for `@property`.
    #
    # This tag specifies that the symbol should be treated as a property and,
    # as part of post-processing, should be attached to the most recently-
    # defined class.

    class Property < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@property` name for use in documentation, and will allow only a single
      # line of documentation to be included in the tag.

      def initialize
        @name = :property
        @multiline = false
      end

      def process(symbol)
        symbol[@name] = true
      end
    end
  end
end
