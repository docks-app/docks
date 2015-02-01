module Docks
  module Tags

    # Public: The tag attributes for `@markup`.
    #
    # The `markup` tag is the easiest way to include markup for your
    # components. The default template will use this (with some extra logic
    # thrown in) to generate the demo component.

    class Markup < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@markup` name for use in documentation and allows it to span multiple
      # lines.

      def initialize
        @name = :markup
      end


      # Public: Processes the parse results for this tag into the (near-)final
      # representation for use in the pattern library. This is done by joining
      # lines with a line break.
      #
      # See `Docks::Processors::JoinWithLineBreaks` for examples.
      #
      # content - An array of lines included as the symbol's markup.
      #
      # Returns a String with the joined together markup.

      def process(content)
        Docks::Processors::JoinWithLineBreaks.process(content)
      end
    end
  end
end
