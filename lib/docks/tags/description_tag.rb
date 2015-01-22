# @description
# The description for this symbol, that's it!

module Docks
  module Tags
    class Description < Base
      def initialize
        @name = :description
      end

      def process(content)
        Docks::Processors::JoinWithSmartLineBreaks.process(content)
      end
    end
  end
end
