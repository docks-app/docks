# @returns
# The type (or multiple types, comma-/space-/pipe-delimited) enclosed
# in curly braces, followed (optionally) by a description (which can,
# optionally, be separated from the types with a hyphen).
#
# Synonymous with `@return`.
#
# Only one allowed.

module Docks
  module Tags
    class Returns < Base
      def initialize
        @name = :returns
        @synonyms = [:return]
      end

      def process(content)
        Docks::Processors::PossibleMultilineDescription.process(content) do |first_line|
          match = first_line.match(/\s*\{(?<type>[^\}]*)\}(?:\s*\-?\s*(?<description>.*))?/)
          return nil if match.nil?

          description = match[:description]
          {
            types: Docks::Processors::BreakApartTypes.process(match[:type]),
            description: description.nil? || description.length == 0 ? nil : match[:description]
          }
        end
      end
    end
  end
end
