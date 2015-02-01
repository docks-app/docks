module Docks
  module Tags

    # Public: The tag attributes for `@symbol_type`.
    #
    # You can use the `symbol_type` tag to explicitly set the type of symbol
    # that is being parsed. As detailed in [the parsing flow](/parsing-flow),
    # the `symbol_type` is implicitly determined by the language parser based
    # on the contents of the first non-documentation line following the
    # documentation block (except for the `page`/ `pattern` block, which gets
    # its own, special `symbol_type`).
    #
    # Only use this tag when changing the symbol type from what it would be
    # assumed to be based on the next non-documentation line of code. For
    # example, Docks will imply whether a class is a state/ variant based on
    # BEM naming conventions; use this tag to override that assumption.

    class SymbolType < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@symbol_type` name for use in documentation, and will allow only a
      # single line of documentation to be included in the tag.

      def initialize
        @name = :symbol_type
        @multiline = false
      end
    end
  end
end
