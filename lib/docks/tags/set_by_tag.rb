# @set_by
# Name of method or attribute by which the state/ variant is set,
# followed by an (optional) parenthesis containing the required
# constant or value required.

module Docks
  module Tags
    class SetBy < Base
      def initialize
        @name = :set_by
        @type = Docks::Types::Tag::MULTIPLE_PER_LINE
      end

      def process(content)
        content = Docks::Processors::BreakApartOnCommasAndPipes.process(content)
        Docks::Processors::NameAndParenthetical.process(content, :setter, :constant)
      end
    end
  end
end
