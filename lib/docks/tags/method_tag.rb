module Docks
  module Tags

    # Public: The tag attributes for `@method`.
    #
    # This tag specifies that the symbol should be treated as a method and,
    # as part of post-processing, should be attached to the most recently-
    # defined class.

    class Method < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@method` name for use in documentation, and will allow only a single
      # line of documentation to be included in the tag.

      def initialize
        @name = :method
        @multiline = false
      end
    end
  end
end
