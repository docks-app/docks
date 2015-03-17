module Docks
  module Tags

    # Public: The tag attributes for `@beta`.
    #
    # This tag indicates the version and description of a beta notice for the
    # current symbol.

    class Beta < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@beta` name for use in documentation, allows multiple lines of
      # documentation to be included in the tag, and allows only a single such
      # tag included per documentation block.

      def initialize
        @name = :beta
        @synonyms = [:experimental]
      end


      # Public: The beta notice is very simple — include the version in
      # which the beta was added on the first line, plus an (optional)
      # single or multiline description (if multiline, you can start the
      # description on the same line as the version by separating it from the
      # version with a hyphen).
      #
      # content - An Array of Strings showing the lines parsed from the
      # documentation.
      #
      # Examples
      #
      #   Docks::Tags::Beta.process(["v2.0 - Beta details."])
      #   # => { version: "v2.0", description: "Beta details." }
      #
      #   Docks::Tags::Beta.process(["Version 2.3.3-b2 - The beta", "details."])
      #   # => { version: "Version 2.3.3-b2", description: "The beta details." }
      #
      # Returns a Hash showing the version and description of the beta notice.

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
