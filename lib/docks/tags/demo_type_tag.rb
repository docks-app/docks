# @demo_type
# The type of demo that should be used for the current state
# or variant.
#
# Only one allowed.

module Docks
  module Tags
    class DemoType < Base
      def initialize
        @name = :demo_type
      end

      def process(content)
        content = Docks::Processors::JoinWithBlanks.process(content)
        Docks::Processors::EnsureValidDemoType.process(content)
      end
    end
  end
end
