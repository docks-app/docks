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

    # Public: The tag attributes for `@throws`.
    #
    # The `throws` tag provides details on the kinds of errors that may be
    # thrown during the execution of this symbol.

    class Throws < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@throws` name for use in documentation, allows multiple lines of
      # documentation to be included in the tag, allows multiple such tag to
      # be included per documentation block, and will create the `@throw` and
      # `@exception` tags as synonyms for `@throws`.

      def initialize
        @name = :throws
        @synonyms = [:throw, :exception]
        @type = Docks::Types::Tags::MULTIPLE_PER_BLOCK
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
