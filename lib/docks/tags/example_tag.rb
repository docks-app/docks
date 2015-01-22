# @example
# A code example with optional language. If provided, the language must
# be on the first line of the tag. If not provided, the language will default
# to Docks::Languages::DEFAULT.
#
# Multiple allowed.

module Docks
  module Tags
    class Example < Base
      def initialize
        @name = :example
        @type = Docks::Types::Tag::MULTIPLE_PER_BLOCK
      end

      def process(content)
        Docks::Processors::CodeBlockWithLanguage.process(content)
      end
    end
  end
end
