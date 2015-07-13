module Docks
  module Tags
    class Pattern < Base
      def initialize
        @name = :pattern
        @synonyms = [:page]
        @multiline = false
      end
    end
  end
end
