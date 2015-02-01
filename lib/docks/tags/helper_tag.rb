module Docks
  module Tags

    # Public: The tag attributes for `@helper`.
    #
    # The `helper` tag is an interesting and powerful option for providing
    # markup for your components. There are two possible uses of this tag:
    #
    # 1. Present the actual helper markup required to generate your component.
    #
    # 2. Write the name of the helper function. This can be used in two ways
    # to generate the component: it can either be combined with a stub file
    # for the component to construct the helper markup intelligently, or can
    # be used in combination with the `markup` tag to show that the markup tag
    # actually contains helper markup (as opposed to rendered markup).

    class Helper < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@helper` name for use in documentation and allows it to span multiple
      # lines.

      def initialize
        @name = :helper
      end


      # Public: Processes the parse results for this tag into the (near-)final
      # representation for use in the pattern library. This is done by joining
      # lines with a line break.
      #
      # See `Docks::Processors::JoinWithLineBreaks` for examples.
      #
      # content - An array of lines included as the helper markup.
      #
      # Returns a String with the joined together helper markup.

      def process(content)
        Docks::Processors::JoinWithLineBreaks.process(content)
      end
    end
  end
end
