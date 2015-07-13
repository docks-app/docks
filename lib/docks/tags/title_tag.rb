module Docks
  module Tags
    class Title < Base
      def initialize
        @name = :title
        @multiline = false
      end
    end
  end
end
