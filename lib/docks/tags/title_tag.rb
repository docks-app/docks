# @title
# The title of a block (that is, the readable name), that's all!
#
# Only one allowed.

module Docks
  module Tags
    class Title < Base
      def initialize
        @name = :title
      end
    end
  end
end
