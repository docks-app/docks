module Docks
  module Tags

    # Public: The tag attributes for `@description`. Use this tag to provide a
    # detailed description of the symbol for display in the pattern lab. This
    # description (along with the description options for all other tags that
    # support a description) will be parsed as Markdown.

    class Description < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@description` name for use in documentation.

      def initialize
        @name = :description
      end


      # Public: Processes the parse results for this tag into the (near-)final
      # representation for use in the pattern library. This is done by joining
      # lines that appear to be part of the same paragraph with spaces, and
      # joining lines that appear to be from a new paragraph with three line
      # breaks. This will make the Markdown post-processing work better.
      #
      # See `Docks::Processors::JoinWithSmartLineBreaks` for examples.
      #
      # content - An array of lines included as the description.
      #
      # Returns a String with the joined together description.

      def process(content)
        Docks::Processors::JoinWithSmartLineBreaks.process(content)
      end
    end
  end
end
