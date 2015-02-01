module Docks
  module Tags

    # Public: The tag attributes for `@name`.
    #
    # You can use the `name` tag to explicitly set the name of the symbol that
    # is being parsed. The `name` is implicitly determined by the language
    # parser based on the contents of the first non-documentation line
    # following the documentation block (except for the `page`/ `pattern`
    # block, which has no `name` property). There is rarely a reason to use
    # this tag explicitly.
    #
    # A related property is `title`, which allows you to specify a more user-
    # friendly name as a heading for blocks describing this symbol.

    class Name < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@name` name for use in documentation, and will allow only a single
      # line of documentation to be included in the tag.

      def initialize
        @name = :name
        @multiline = false
      end
    end
  end
end
