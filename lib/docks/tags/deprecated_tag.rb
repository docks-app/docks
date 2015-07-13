module Docks
  module Tags
    class Deprecated < Base
      def initialize
        @name = :deprecated
        @synonyms = [:deprecation]
      end

      def process(symbol)
        symbol.update(@name) do |deprecated|
          deprecated = multiline_description(deprecated) do |first_line|
            if match = first_line.match(/\s*(?<version>.*?)(?:\s+\-\s+(?<description>.*))?$/)
              description = match[:description]
              {
                version: match[:version],
                description: description.nil? || description.length == 0 ? nil : match[:description]
              }
            end
          end

          OpenStruct.new(deprecated)
        end
      end
    end
  end
end
