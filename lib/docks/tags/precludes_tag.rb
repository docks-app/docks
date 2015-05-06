module Docks
  module Tags

    # Public: The tag attributes for `@precludes`.
    #
    # This tag is effectively the opposite of `activate_with` — it specifies
    # other variations that should *not* be on a symbol at the same time as
    # this one. The default theme will ensure that these two variations are
    # not both applied to any demo components.

    class Precludes < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@precludes` name for use in documentation, will allow only a single
      # line of documentation to be included in the tag, and will allow
      # multiple results to be included on a single line.

      def initialize
        @name = :precludes
        @multiline = false
        @type = Docks::Types::Tags::MULTIPLE_PER_LINE
      end


      # Public: Proccesses the parsed documentation into a list of symbols
      # that should not be activated at the same time as this symbol.
      #
      # See `Docks::Processors::BreakApartOnCommasSpacesAndPipes` for examples.
      #
      # content - The line parsed from the documentation.
      #
      # Returns an Array of Strings.

      def process(content)
        content = Docks::Processors::BreakApartOnCommasSpacesAndPipes.process(content)
      end
    end
  end
end
