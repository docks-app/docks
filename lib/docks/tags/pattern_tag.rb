module Docks
  module Tags

    # Public: The tag attributes for `@pattern`.
    #
    # The `pattern` tag allows you to specify a title for the overall pattern.
    # This is also the title that will be shown in the default template's
    # sidebar as a link to the pattern. The presence of this tag also
    # indicates that all other tags in the same documentation block are
    # treated as pattern-level details (as opposed to details pertaining to
    # only a single symbol).

    class Pattern < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@pattern` name for use in documentation, will allow only a single
      # line of documentation to be included in the tag, will allow the tag
      # to be used only once in a given file, and creates the `@page` tag
      # that acts as a synonym for `@pattern`.

      def initialize
        @name = :pattern
        @synonyms = [:page]
        @type = Docks::Types::Tag::ONE_PER_FILE
        @multiline = false
      end
    end
  end
end
