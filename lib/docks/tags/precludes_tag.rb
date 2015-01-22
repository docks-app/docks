# @precludes
# Symbols that should not be used in conjunction with this symbol.
#
# Multiple allowed.

module Docks
  module Tags
    class Precludes < Base
      def initialize
        @name = :precludes
        @type = Docks::Types::Tag::MULTIPLE_PER_LINE
      end

      def process(content)
        content = Docks::Processors::BreakApartOnCommasSpacesAndPipes.process(content)
      end
    end
  end
end
