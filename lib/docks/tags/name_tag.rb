# @name
# The name of a block. This tag is technically not necessary —
# it will automatically be inferred by the first line following
# the block. The tag will, however, override the implicit name.
#
# Only one allowed.

module Docks
  module Tags
    class Name < Base
      def initialize
        @name = :name
        @multiline = false
      end
    end
  end
end
