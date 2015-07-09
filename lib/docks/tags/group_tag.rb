module Docks
  module Tags
    class Group < Base
      def initialize
        @name = :group
        @multiline = false
      end
    end
  end
end
