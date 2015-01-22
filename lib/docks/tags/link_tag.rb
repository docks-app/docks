# @link
# Relevant URL, followed by an (optional) parenthesis containing
# a caption for the link.
#
# Synonymous with `@see` and `@links`.
#
# Multiple allowed, one per line.

module Docks
  module Tags
    class Link < Base
      def initialize
        @name = :link
        @synonyms = [:links, :see]
        @type = Docks::Types::Tag::MULTIPLE_PER_BLOCK
      end

      def process(content)
        Docks::Processors::NameAndParenthetical.process(content, :url, :caption)
      end
    end
  end
end
