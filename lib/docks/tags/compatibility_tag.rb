module Docks
  module Tags

    # Public: The tag attributes for `@compatibility`.
    # This tag allows you to detail the browser support for a given symbol.

    class Compatibility < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@compatibility` name for use in documentation, will allow only a
      # single line of documentation to be included in the tag, and will allow
      # multiple results to be included on a single line. This will also
      # create a usable tag for `@compatible_with` that is synonymous with
      # `@compatibility`.

      def initialize
        @name = :compatibility
        @synonyms = [:compatible_with]
        @multiline = false
        @type = Docks::Types::Tag::MULTIPLE_PER_LINE
      end


      # Public: Processes the parsed documentation into an Array of Hashes
      # representing the browsers' details. Regardless of whether you have one
      # or multiple compatibility declarations attached to a single tag, every
      # compatibility detail will be parsed such that the text before a set of
      # parentheses will be treated as the browsers's name, and the contents
      # of the parentheses will be treated as a set of key-value pairs. If no
      # such pairs are found (that is, there is only a single value, most
      # likely a version number), the contents of the parentheses are assumed
      # to be the the version details.
      #
      # See `Docks::Processors::SplitOnTopLevelParenthesesCommasAndPipes` and
      # `Docks::Processors::NameAndParenthetical` for examples.
      #
      # content - The line parsed from the documentation.
      #
      # Returns an Array of Hashes where each Hash represents a single
      # compatibility's details.

      def process(content)
        content = Docks::Processors::SplitOnTopLevelParenthesesCommasAndPipes.process(content)
        Docks::Processors::NameAndParenthetical.process(content, :browser, :version)
      end
    end
  end
end
