module Docks
  module Tags

    # Public: The tag attributes for `@deprecated`.
    #
    # This tag indicates the version and description of a deprecation warning
    # for the current symbol.

    class Deprecated < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@deprecated` name for use in documentation, allows multiple lines of
      # documentation to be included in the tag, abd allows only a single such
      # tag included per documentation block.

      def initialize
        @name = :deprecated
        @synonyms = [:deprecation]
      end


      # Public: The deprecation alert is very simple — include the version in
      # which the deprecation occurs on the first line, plus an (optional)
      # single or multiline description (if multiline, you can start the
      # description on the same line as the version by separating it from the
      # version with a hyphen).
      #
      # content - An Array of Strings showing the lines parsed from the
      # documentation.
      #
      # Examples
      #
      #   Docks::Tags::Deprecated.process(["v2.0 - Deprecation details."])
      #   # => { version: "v2.0", description: "Deprecation details." }
      #
      #   Docks::Tags::Deprecated.process(["Version 2.3.3-b2 - The deprecation", "details."])
      #   # => { version: "Version 2.3.3-b2", description: "The deprecation details." }
      #
      # Returns a Hash showing the version and description of the deprecation
      # warning.

      def process(content)
        Docks::Processors::PossibleMultilineDescription.process(content) do |first_line|
          match = first_line.match(/\s*(?<version>.*?)(?:\s+\-\s+(?<description>.*))?$/)
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
