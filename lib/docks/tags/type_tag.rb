module Docks
  module Tags
    class Type < Base
      def initialize
        @name = :type
        @multiline = false
      end
    end
  end
end
