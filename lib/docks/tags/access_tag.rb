# @access
# The access level of the method/ function.
#
# Only one allowed.

module Docks
  module Tags
    class Access < Base
      def initialize
        @name = :access
        @access_types = Docks::Types::Access.constants.map { |const| Docks::Types::Access.const_get(const) }
      end

      def process(content)
        content = Docks::Processors::JoinWithBlanks.process(content)
        @access_types.include?(content) ? content : nil
      end
    end
  end
end
