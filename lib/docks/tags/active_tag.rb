# @active
# Whether or not a given item (typically, a state or variant)
# should automatically be activated in the component demo
# (this assumes that the variant/ state is a 'select' type).
#
# Only one allowed.

module Docks
  module Tags
    class Active < Base
      def initialize
        @name = :active
      end

      def process(content)
        content = Docks::Processors::JoinWithBlanks.process(content)
        Docks::Processors::StringyBoolean(content)
      end
    end
  end
end
