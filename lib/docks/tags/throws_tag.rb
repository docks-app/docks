# @throws
# The type (or multiple types, comma-/space-/pipe-delimited) enclosed
# in curly braces, followed (optionally) by a single or multiline
# description (which can, optionally, be separated from the types with a hyphen).
#
# Synonymous with `@throw` and `@exception`.
#
# Multiple allowed.

module Docks
  module Tags
    class Throws < Base
      def initialize
        @name = :throws
        @synonyms = [:throw, :exception]
        @type = Docks::Types::Tag::MULTIPLE_PER_BLOCK
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
