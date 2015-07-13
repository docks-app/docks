module Docks
  module Tags
    class Since < Base
      def initialize
        @name = :since
        @synonyms = [:introduced_in]
      end

      def process(symbol)
        symbol.update(@name) do |since|
          since = multiline_description(since) do |first_line|
            if match = first_line.match(/\s*(?<version>[0-9a-zA\.\-_]*)(?:\s+\-?\s*(?<description>.*))?/)
              description = match[:description]
              {
                version: match[:version],
                description: description.nil? || description.length == 0 ? nil : match[:description]
              }
            end
          end

          OpenStruct.new(since)
        end
      end
    end
  end
end
