# @require
# Another symbol with which this symbol should be included.
#
# Synonymous with `@requires`
#
# Multiple allowed.

module Docks
  module Tags
    class Require < Base
      def initialize
        @name = :require
        @synonyms = [:requires]
        @type = Docks::Types::Tag::MULTIPLE_PER_LINE
      end

      def process(content)
        content = Docks::Processors::BreakApartOnCommasSpacesAndPipes.process(content)
      end
    end
  end
end
