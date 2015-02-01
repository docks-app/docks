module Docks
  module Tags

    # Public: The tag attributes for `@alias`.
    # Specifies one or more other names by which the symbol should be known.

    class Alias < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@alias` name for use in documentation, will allow only a single line
      # of documentation to be included in the tag, and will allow multiple
      # results to be included on a single line.

      def initialize
        @name = :alias
        @multiline = false
        @type = Docks::Types::Tag::MULTIPLE_PER_LINE
      end


      # Public: Proccesses the parsed documentation into a list of symbols
      # to which this tag should be aliased.
      #
      # See `Docks::Processors::BreakApartOnCommasSpacesAndPipes` for examples.
      #
      # content - The line parsed from the documentation.
      #
      # Returns an Array of Strings showing the symbols to alias with this
      # symbol.

      def process(content)
        Docks::Processors::BreakApartOnCommasSpacesAndPipes.process(content)
      end
    end
  end
end
