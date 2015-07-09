module Docks
  module Tags
    class Throws < Base
      def initialize
        @name = :throws
        @synonyms = [:throw, :exception]
        @multiple_allowed = true
      end

      def process(symbol)
        symbol.update(@name) do |throws|
          Array(throws).map do |a_throw|
            a_throw = multiline_description(a_throw) do |first_line|
              if match = first_line.match(/\s*\{(?<type>[^\}]*)\}(?:\s*\-?\s*(?<description>.*))?/)
                description = match[:description]

                {
                  types: split_types(match[:type]),
                  description: description.nil? || description.length == 0 ? nil : match[:description]
                }
              end
            end

            OpenStruct.new(a_throw)
          end
        end
      end
    end
  end
end
