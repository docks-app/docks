module Docks
  module Tags
    class Beta < Base
      def initialize
        @name = :beta
        @synonyms = [:experimental]
      end

      def process(symbol)
        symbol.update(@name) do |beta|
          beta = multiline_description(beta) do |first_line|
            if match = first_line.match(/\s*(?<version>.*?)(?:\s+\-\s+(?<description>.*))?$/)
              description = match[:description]
              {
                version: match[:version],
                description: description.nil? || description.length == 0 ? nil : match[:description]
              }
            end
          end

          OpenStruct.new(beta)
        end
      end
    end
  end
end
