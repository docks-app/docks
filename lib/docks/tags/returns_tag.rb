module Docks
  module Tags
    class Returns < Base
      def initialize
        @name = :returns
        @synonyms = [:return]
      end

      def process(symbol)
        symbol.update(@name) do |returns|
          returns = multiline_description(returns) do |first_line|
            first_line.strip!
            if match = first_line.match(/nothing\s*\-?\s*(?<description>.*)/i)
              { description: match[:description] }

            else
              match = first_line.match(/\{?(?<type>[^\}\-]*)\}?(?:\s*\-?\s*(?<description>.*))?/)
              {
                types: split_types(match[:type].strip),
                description: match[:description]
              }
            end
          end

          returns[:types] = nil if Array(returns[:types]).empty?
          OpenStruct.new(returns)
        end
      end
    end
  end
end
