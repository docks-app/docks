# @require
# Another symbol with which this symbol should be included.
#
# Synonymous with `@requires`
#
# Multiple allowed.

module Docks
  module Tags

    # Public: The tag attributes for `@require`.
    #
    # The `require` tag indicates other symbols that allow the current symbol
    # to function correctly.

    class Require < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@require` name for use in documentation, will allow only a single
      # line of documentation to be included in the tag, will allow multiple
      # results to be included on a single line, and will create the
      # `@requires` tag as a synonym for `@require`.

      def initialize
        @name = :require
        @synonyms = [:requires]
        @multiline = false
        @type = Docks::Types::Tags::MULTIPLE_PER_LINE
      end


      # Public: Proccesses the parsed documentation into a list of symbols
      # that are required by the current symbol.
      #
      # See `Docks::Processors::BreakApartOnCommasSpacesAndPipes` for examples.
      #
      # content - The line parsed from the documentation.
      #
      # Returns an Array of Strings.

      def process(symbol)
        symbol.update(@name) do |requires|
          Array(requires).map { |a_require| split_on_commas_spaces_and_pipes(a_require) }.flatten
        end
      end
    end
  end
end
