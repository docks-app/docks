module Docks
  module Tags

    # Public: The tag attributes for `@title`.
    #
    # The `title` tag allows you to specify a more user-friendly title for
    # referring to a given symbol. The default theme will present this title
    # for sections showing the symbol, falling back to the `name` property
    # otherwise.

    class Title < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@title` name for use in documentation, will allow only a single
      # line of documentation to be included in the tag, and will allow the tag
      # to be used only once per documentation block.

      def initialize
        @name = :title
        @multiline = false
      end
    end
  end
end
