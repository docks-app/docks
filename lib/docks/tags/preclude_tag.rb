module Docks
  module Tags

    # Public: The tag attributes for `@precludes`.
    #
    # This tag is effectively the opposite of `activate_with` — it specifies
    # other variations that should *not* be on a symbol at the same time as
    # this one. The default theme will ensure that these two variations are
    # not both applied to any demo components.

    class Preclude < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@precludes` name for use in documentation, will allow only a single
      # line of documentation to be included in the tag, and will allow
      # multiple results to be included on a single line.

      def initialize
        @name = :preclude
        @synonyms = :precludes
        @multiline = false
        @type = Docks::Types::Tags::MULTIPLE_PER_LINE
      end

      def process(symbol)
        symbol.update(@name) do |precludes|
          Array(precludes).map { |preclude| split_on_commas_spaces_and_pipes(preclude) }.flatten
        end
      end
    end
  end
end
