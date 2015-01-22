# @group
# The group to which this block should belong.
#
# Only one allowed.

module Docks
  module Tags
    class Group < Base
      def initialize
        @name = :group
      end

      def process(content)
        Docks::Processors::JoinWithBlanks.process(content)
      end
    end
  end
end
