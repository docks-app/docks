module Docks
  module Tags
    class Value < Base
      def initialize
        @name = :value
        @multiline = false
      end
    end
  end
end
