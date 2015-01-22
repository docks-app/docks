# @page
# The title of the page, that's all!
#
# Only one allowed.

module Docks
  module Tags
    class Page < Base
      def initialize
        @name = :page
        @type = Docks::Types::Tag::ONE_PER_FILE
        @multiline = false
      end
    end
  end
end
