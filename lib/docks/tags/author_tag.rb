# @author
# Name of author followed by an (optional) parenthesis containing the their
# details (by default, details are interpreted as email addresses).
#
# Synonymous with `@authors`.
#
# Multiple allowed, one per line.

module Docks
  module Tags
    class Author < Base
      def initialize
        @name = :author
        @synonyms = [:authors]
        @type = Docks::Types::Tag::MULTIPLE_PER_LINE
      end

      def process(content)
        Docks::Processors::NameAndParenthetical.process(content, :name, :email)
      end
    end
  end
end
