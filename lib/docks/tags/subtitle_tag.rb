module Docks
  module Tags

    # Public: The tag attributes for `@subtitle`.
    #
    # This tag specifies a subtitle for the page. As such, it should only be
    # used in a `page`/ `pattern` block.

    class Subtitle < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@subtitle` name for use in documentation, will allow only a single
      # line of documentation to be included in the tag, will allow the tag
      # to be used only once in a given file, and creates the `@tagline` tag
      # that acts as a synonym for `@subtitle`.

      def initialize
        @name = :subtitle
        @synonyms = [:tagline]
        @type = Docks::Types::Tags::ONE_PER_FILE
        @multiline = false
      end
    end
  end
end
