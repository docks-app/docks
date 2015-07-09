module Docks
  module Tags
    class Preclude < Base
      def initialize
        @name = :preclude
        @multiline = false
        @multiple_allowed = true
      end

      def process(symbol)
        symbol.update(@name) do |precludes|
          Array(precludes).map { |preclude| split_on_commas_spaces_and_pipes(preclude) }.flatten
        end
      end
    end
  end
end
