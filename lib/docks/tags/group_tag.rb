module Docks
  module Tags

    # Public: The tag attributes for `@group`.
    #
    # This tag specifies what group this symbol should belong to. In the
    # default theme, this is most useful to include as part of the page/
    # pattern block — the default theme will group patterns in the sidebar
    # based first on their page/ pattern block's group tag (and, secondarily,
    # based on the type of the first symbol within that file).

    class Group < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@group` name for use in documentation, and will allow only a single
      # line of documentation to be included in the tag.

      def initialize
        @name = :group
        @multiline = false
      end
    end
  end
end
