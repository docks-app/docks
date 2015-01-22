# @javascript_action
# The action that should be taken when this state/ variant
# is toggled on/ off.
#
# Only one allowed.

module Docks
  module Tags
    class JavascriptAction < Base
      def initialize
        @name = :javascript_action
      end

      def process(content)
        Docks::Processors::JoinWithBlanks.process(content)
      end
    end
  end
end
