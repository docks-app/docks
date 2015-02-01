module Docks
  module Tags

    # Public: The tag attributes for `@since`.
    # This tag indicates a version in which this symbol was introduced.

    class Since < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@since` name for use in documentation, allows multiple lines of
      # documentation to be included in the tag, allows only a single such tag
      # included per documentation block, and will create the `@introduced_in`
      # tag as a synonym for `@since`.

      def initialize
        @name = :since
        @synonyms = [:introduced_in]
      end


      # Public: The `since` tag is composed of two parts: a version string
      # (presented immediately after the tag) and, optionally, a description
      # (which can be single or multiline).
      #
      # content - An Array of Strings showing the lines parsed from the
      # documentation.
      #
      # Examples
      #
      #   Docks::Tags::Since.process(["1.0"])
      #   # => { version: "1.0" }
      #
      #   Docks::Tags::Since.process(["1.0-b234 - The version", "details."])
      #   # => { version: "1.0-b234", description: "The version details." }
      #
      # Returns a Hash showing the version and description of the version in
      # which this symbol was introduced.

      def process(content)
        Docks::Processors::PossibleMultilineDescription.process(content) do |first_line|
          match = first_line.match(/\s*(?<version>[0-9a-zA\.\-_]*)(?:\s+\-?\s*(?<description>.*))?/)
          return nil if match.nil?

          description = match[:description]
          {
            version: match[:version],
            description: description.nil? || description.length == 0 ? nil : match[:description]
          }
        end
      end
    end
  end
end
