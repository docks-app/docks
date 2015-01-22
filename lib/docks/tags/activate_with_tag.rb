# @activate_with
# Symbols that should be used in conjunction with one another.
#
# Multiple allowed.

module Docks
  module Tags
    class ActivateWith < Base
      def initialize
        @name = :activate_with
        @type = Docks::Types::Tag::MULTIPLE_PER_LINE
      end

      def process(content)
        Docks::Processors::BreakApartOnCommasSpacesAndPipes.process(content)
      end
    end
  end
end
