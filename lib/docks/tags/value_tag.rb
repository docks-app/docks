module Docks
  module Tags

    # Public: The tag attributes for `@value`.
    # The `value` tag allows you to provide the actual value of a given symbol.

    class Value < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@value` name for use in documentation, will allow only a single line
      # of documentation to be included in the tag, and will allow the tag to
      # be used only once per documentation block.

      def initialize
        @name = :value
        @multiline = false
      end
    end
  end
end
