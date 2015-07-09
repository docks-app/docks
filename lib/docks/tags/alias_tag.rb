module Docks
  module Tags
    class Alias < Base
      def initialize
        @name = :alias
        @multiline = false
        @multiple_allowed = true
      end

      def process(symbol)
        symbol.update(@name) do |aliases|
          Array(aliases).map { |alias_line| split_on_commas_spaces_and_pipes(alias_line) }.flatten
        end
      end
    end
  end
end
