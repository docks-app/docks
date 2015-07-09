module Docks
  module Tags
    class ActivateWith < Base
      def initialize
        @name = :activate_with
        @multiline = false
        @multiple_allowed = true
      end

      def process(symbol)
        symbol.update(@name) do |activate_withs|
          Array(activate_withs).map { |with| split_on_commas_spaces_and_pipes(with) }.flatten
        end
      end
    end
  end
end
