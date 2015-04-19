module Docks
  module Tags

    # Public: The tag attributes for `@activate_with`.
    #
    # Specifies other symbols that should be used in conjunction with the
    # current symbol. This is most commonly useful with variations on one
    # component that should be activated together with corresponding
    # variations on a related component (for example, an error state on both
    # an input and a label).

    class ActivateWith < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@activate_with` name for use in documentation, will allow only a
      # single line of documentation to be included in the tag, and will allow
      # multiple results to be included on a single line.

      def initialize
        @name = :activate_with
        @multiline = false
        @type = Docks::Types::Tags::MULTIPLE_PER_LINE
      end


      # Public: Proccesses the parsed documentation into a list of symbols
      # with which this tag should be activated.
      #
      # See `Docks::Processors::BreakApartOnCommasSpacesAndPipes` for examples.
      #
      # content - The line parsed from the documentation.
      #
      # Returns an Array of Strings showing the symbols to activate with this
      # symbol.

      def process(content)
        Docks::Processors::BreakApartOnCommasSpacesAndPipes.process(content)
      end
    end
  end
end
