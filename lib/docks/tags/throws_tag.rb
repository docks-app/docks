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
        @type = Docks::Types::Tag::MULTIPLE_PER_BLOCK
      end


      # Public: The error type is denoted as it is for `param` — one or more
      # types in curly braces immediately following the tag, separated by
      # commas, pipes, or spaces. Since there can be many types, the types are
      # always returned as an array. The (optional) description is also
      # treated the same was as `param`: you can have a single or multiline
      # description, starting on the line of the tag or the following line,
      # and optionally separated from the error type(s) by a hyphen.
      #
      # content - An Array of Strings showing the lines parsed from the
      # documentation.
      #
      # Examples
      #
      #   Docks::Tags::Throws.process(["{NameError | TypeError}"])
      #   # => { types: ["NameError", "TypeError"] }
      #
      #   Docks::Tags::Throws.process(["{ TypeError } - The error", "details."])
      #   # => { types: ["TypeError"], description: "The error details." }
      #
      # Returns a Hash showing the type and description of the error that can
      # be thrown by this symbol.

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
