module Docks
  module Tags

    # Public: The tag attributes for `@returns`.
    #
    # This tag indicates the type and description of the return value for a
    # given symbol.

    class Returns < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@returns` name for use in documentation, allows multiple lines of
      # documentation to be included in the tag, allows only a single such tag
      # included per documentation block, and will create the `@return` tag as
      # a synonym for `@returns`.

      def initialize
        @name = :returns
        @synonyms = [:return]
      end


      # Public: The return type is denoted as it is for `param` — one or more
      # types in curly braces immediately following the tag, separated by
      # commas, pipes, or spaces. Since there can be many types, the types are
      # always returned as an array. The (optional) description is also
      # treated the same was as `param`: you can have a single or multiline
      # description, starting on the line of the tag or the following line,
      # and optionally separated from the type(s) by a hyphen.
      #
      # content - An Array of Strings showing the lines parsed from the
      # documentation.
      #
      # Examples
      #
      #   Docks::Tags::Returns.process(["{String | Array}"])
      #   # => { types: ["String", "Array"] }
      #
      #   Docks::Tags::Returns.process(["{ Object } - The tag", "details."])
      #   # => { types: ["Object"], description: "The tag details." }
      #
      # Returns a Hash showing the type and description of the value this
      # symbol returns.

      def process(content)
        Docks::Processors::PossibleMultilineDescription.process(content) do |first_line|
          first_line.strip!
          return nil if first_line.length == 0 || first_line.downcase == "nothing"

          match = first_line.match(/\s*\{?(?<type>[^\}]*)\}?(?:\s*\-?\s*(?<description>.*))?/)
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
