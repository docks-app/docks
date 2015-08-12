module Docks
  module Tags
    class Pattern < Base
      def initialize
        @name = :pattern
        @synonyms = [:page]
        @multiline = false
      end

      def setup_post_processors
        after_each_pattern(:middle) do |pattern|
          name = pattern.name

          pattern.symbols.each do |symbol|
            symbol.pattern = name
          end
        end
      end
    end
  end
end
