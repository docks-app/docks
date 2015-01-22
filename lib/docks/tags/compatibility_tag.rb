# @compatibility
# Name of the browser followed by an (optional) parenthesis containing the
# details (by default, details are interpreted as a version number).
#
# Synonymous with `@compatible_with`.
#
# Multiple allowed, one per line.

module Docks
  module Tags
    class Compatibility < Base
      def initialize
        @name = :compatibility
        @synonyms = [:compatible_with]
        @type = Docks::Types::Tag::MULTIPLE_PER_LINE
      end

      def process(content)
        Docks::Processors::NameAndParenthetical.process(content, :browser, :version)
      end
    end
  end
end
