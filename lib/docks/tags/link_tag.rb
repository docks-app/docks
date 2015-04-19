module Docks
  module Tags

    # Public: The tag attributes for `@link`.
    #
    # This tag allows you to specify other resources relevant to the current
    # symbol.

    class Link < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@link` name for use in documentation, will allow only a single line
      # of documentation to be included in the tag, and will allow multiple
      # results to be included in a documentation block. This will also create
      # tags for `@links` and `@see`, which are synonymous with `@link`.

      def initialize
        @name = :link
        @synonyms = [:links, :see]
        @type = Docks::Types::Tags::MULTIPLE_PER_BLOCK
      end


      # Public: Processes the parsed documentation into an Array of Hashes
      # representing the link's details. The part of the tag before the first
      # parentheses is assumed to be a URL. You can then optionally a set of
      # key-value pairs in parentheses specifying additional details. The
      # first item in the parentheses is assumed to be a caption if no key is
      # provided.
      #
      # See `Docks::Processors::NameAndParenthetical` for examples.
      #
      # content - The line parsed from the documentation.
      #
      # Returns the Hash representing the link's details

      def process(content)
        # TODO: NameAndParenthetical only returns one
        Docks::Processors::NameAndParenthetical.process(content, :url, :caption).first
      end
    end
  end
end
