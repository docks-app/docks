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
        @type = Docks::Types::Tags::MULTIPLE_PER_LINE
      end

      def process(symbol)
        symbol.update(@name) do |aliases|
          Array(aliases).map { |alias_line| split_on_commas_spaces_and_pipes(alias_line) }.flatten
        end
      end
    end
  end
end
