module Docks
  module Tags
    class Compatibility < Base
      def initialize
        @name = :compatibility
        @synonyms = [:compatible_with]
        @multiline = false
        @multiple_allowed = true
      end

      def process(symbol)
        symbol.update(@name) do |compatibilities|
          compatibilities = Array(compatibilities).map { |compatibility| split_on_top_level_parens_commas_and_pipes(compatibility) }.flatten
          compatibilities.map { |compatibility| OpenStruct.new name_and_parenthetical(compatibility, :browser, :version) }
        end
      end
    end
  end
end
