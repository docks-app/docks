module Docks
  module Tags

    # Public: The tag attributes for `@author`.
    # This tag allows you to list a set of authors/ contributors on a given
    # symbol.

    class Author < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@author` name for use in documentation, will allow only a single line
      # of documentation to be included in the tag, and will allow multiple
      # results to be included on a single line. This will also create tags
      # for `@authors`, `@contributor`, and `@contributors`, which are
      # synonymous with `@author`.

      def initialize
        @name = :author
        @multiline = false
        @synonyms = [:authors, :contributor, :contributors]
        @type = Docks::Types::Tag::MULTIPLE_PER_LINE
      end


      # Public: Processes the parsed documentation into an Array of Hashes
      # representing the authors' details. Regardless of whether you have one
      # or multiple authors attached to a single tag, every author will be
      # parsed such that the text before a set of parentheses will be treated
      # as the author's name, and the contents of the parentheses will be
      # treated as a set of key-value pairs. If no such pairs are found (that
      # is, there is only a single value), the contents of the parentheses are
      # assumed to be the author's email.
      #
      # See `Docks::Processors::SplitOnTopLevelParenthesesCommasAndPipes` and
      # `Docks::Processors::NameAndParenthetical` for examples.
      #
      # content - The line parsed from the documentation.
      #
      # Returns an Array of Hashes where each Hash represents a single
      # author's details.

      def process(content)
        content = Docks::Processors::SplitOnTopLevelParenthesesCommasAndPipes.process(content)

        # TODO: this should be a mapping, NameAndParenthetical should not accept an array
        Docks::Processors::NameAndParenthetical.process(content, :name, :email)
      end
    end
  end
end
