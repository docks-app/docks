module Docks
  module Tags
    class Subtitle < Base
      def initialize
        @name = :subtitle
        @synonyms = [:tagline]
        @multiline = false
      end
    end
  end
end
