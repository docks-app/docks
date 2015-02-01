module Docks
  module Tags

    # Public: The tag attributes for `@type`.
    #
    # The `type` tag allows you to provide a more specific type that the
    # symbol must conform to. This is in contrast to the `symbol_type`
    # attribute that all symbols have — the `symbol_type` attribute specifies
    # the broad category of symbol (function, variable, etc), while the `type`
    # tag can provide a more granual level of detail. This is most useful in
    # presenting the required type for a variable.

    class Type < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@type` name for use in documentation, will allow only a single line
      # of documentation to be included in the tag, and will allow the tag to
      # be used only once per documentation block.

      def initialize
        @name = :type
        @multiline = false
      end
    end
  end
end
