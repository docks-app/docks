module Docks
  module Tags

    # Public: The tag attributes for `@factory`.
    #
    # This tag specifies that the symbol should be treated as a factory — that
    # is, methods and attribuets defined after it will be attached to it (as
    # they are assumed to be methods on the object returned by the factory).

    class Factory < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@factory` name for use in documentation, and will allow only a single
      # line of documentation to be included in the tag.

      def initialize
        @name = :factory
        @multiline = false
        @post_processors = [
          Docks::PostProcessors::BuildClassesAndFactories
        ]
      end

      # Public: processes the parsed content. If any content was identified by
      # the parser, the `factory` attribute will be marked as `true`.

      def process(content)
        true
      end
    end
  end
end
