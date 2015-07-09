module Docks
  module Tags
    class Require < Base
      def initialize
        @name = :require
        @multiline = false
        @multiple_allowed = true
      end

      def process(symbol)
        symbol.update(@name) do |requires|
          Array(requires).map { |a_require| split_on_commas_spaces_and_pipes(a_require) }.flatten
        end
      end
    end
  end
end
