module Docks
  module Tags

    # Public: The tag attributes for `@include_with`.
    #
    # This tag specifies another symbol within the same file that this symbol
    # should be grouped with. In the default template, this is most useful for
    # presenting variations of one component with another, for example, to
    # present variations on a label with the demo of a text field.

    class IncludeWith < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@include_with` name for use in documentation, will allow only a single
      # line of documentation to be included in the tag, and will allow multiple
      # results to be included on a single line.

      def initialize
        @name = :include_with
        @multiline = false
        @type = Docks::Types::Tag::MULTIPLE_PER_LINE
      end


      # Public: Proccesses the parsed documentation into a list of symbols
      # with which this tag should be included.
      #
      # See `Docks::Processors::BreakApartOnCommasSpacesAndPipes` for examples.
      #
      # content - The line parsed from the documentation.
      #
      # Returns an Array of Strings showing the symbols with which to include
      # this symbol.

      def process(content)
        content = Docks::Processors::BreakApartOnCommasSpacesAndPipes.process(content)
      end
    end
  end
end
