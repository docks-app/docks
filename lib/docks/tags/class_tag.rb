module Docks
  module Tags

    # Public: The tag attributes for `@class`.
    #
    # This tag specifies that the symbol should be treated as a class — that is,
    # methods and attribuets defined after it will be attached to it.

    class Klass < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@class` name for use in documentation, and will allow only a single
      # line of documentation to be included in the tag.

      def initialize
        @name = :class
        @multiline = false
        @post_processors = [
          Docks::PostProcessors::BuildClasses
        ]
      end

      # Public: processes the parsed content. If any content was identified by
      # the parser, the `class` attribute will be marked as `true`.

      def process(content)
        true
      end
    end
  end
end
