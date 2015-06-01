module Docks
  module Tags

    # Public: The tag attributes for `@compatibility`.
    # This tag allows you to detail the browser support for a given symbol.

    class Compatibility < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@compatibility` name for use in documentation, will allow only a
      # single line of documentation to be included in the tag, and will allow
      # multiple results to be included on a single line. This will also
      # create a usable tag for `@compatible_with` that is synonymous with
      # `@compatibility`.

      def initialize
        @name = :compatibility
        @synonyms = [:compatible_with]
        @multiline = false
        @type = Docks::Types::Tags::MULTIPLE_PER_LINE
      end

      def process(symbol)
        symbol.update(@name) do |compatibilities|
          compatibilities = Array(compatibilities).map { |compatibility| split_on_top_level_parens_commas_and_pipes(compatibility) }.flatten
          compatibilities.map { |compatibility| OpenStruct.new name_and_parenthetical(compatibility, :browser, :version) }
        end
      end
    end
  end
end
