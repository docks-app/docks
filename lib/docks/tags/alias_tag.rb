# @alias
# Another name by which the symbol should be known.
#
# Multiple allowed.

module Docks
  module Tags
    class Alias < Base
      def initialize
        @name = :alias
        @type = Docks::Types::Tag::MULTIPLE_PER_LINE
      end

      def process(content)
        Docks::Processors::BreakApartOnCommasSpacesAndPipes.process(content)
      end
    end
  end
end
