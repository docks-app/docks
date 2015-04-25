module Docks
  module Tags

    # Public: The tag attributes for `@public`.
    #
    # This tag specifies that the symbol should be treated as public. This is
    # mostly useful for symbols marked as a method by the `@method` tag — a
    # method marked as such will be treated as a method directly on the attached
    # class or factory, rather than on an instance.

    class Public < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@public` name for use in documentation, and will allow only a single
      # line of documentation to be included in the tag.

      def initialize
        @name = :public
        @multiline = false
        @post_processors = [PostProcessors::CleanUpAccess]
      end

      # Public: processes the parsed content. If any content was identified by
      # the parser, the `public` attribute will be marked as true.

      def process(content); true end
    end
  end
end
