# @include_with
# Another symbol with which this symbol should be included.
#
# Multiple allowed.

module Docks
  module Tags
    class IncludeWith < Base
      def initialize
        @name = :include_with
        @type = Docks::Types::Tag::MULTIPLE_PER_LINE
      end

      def process(content)
        content = Docks::Processors::BreakApartOnCommasSpacesAndPipes.process(content)
      end
    end
  end
end
