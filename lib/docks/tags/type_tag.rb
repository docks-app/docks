# @type
# The type of a block. This tag is technically not necessary —
# it will automatically be determined by the result of calling
# ::parse_result_details on the parser.
#
# Only one allowed.

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
