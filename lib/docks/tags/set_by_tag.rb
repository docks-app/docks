module Docks
  module Tags
    class SetBy < Base
      def initialize
        @name = :set_by
        @multiline = false
        @multiple_allowed = true
      end

      def process(symbol)
        symbol.update(@name) do |set_bys|
          set_bys = Array(set_bys).map { |set_by| split_on_top_level_parens_commas_and_pipes(set_by) }.flatten
          set_bys.map { |set_by| OpenStruct.new name_and_parenthetical(set_by, :setter, :constant) }
        end
      end
    end
  end
end
