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

      def process(symbol)
        symbol.update(@name) do |activate_withs|
          Array(activate_withs).map { |with| split_on_commas_spaces_and_pipes(with) }.flatten
        end
      end
    end
  end
end
