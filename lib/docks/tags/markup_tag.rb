# @markup
# Single or multiline text, joined with newlines.
#
# Only one allowed.

module Docks
  module Tags
    class Markup < Base
      def initialize
        @name = :markup
      end

      def process(content)
        Docks::Processors::JoinWithLineBreaks.process(content)
      end
    end
  end
end
