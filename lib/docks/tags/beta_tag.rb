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

      def process(symbol)
        symbol.update(@name) do |beta|
          beta = multiline_description(beta) do |first_line|
            if match = first_line.match(/\s*(?<version>.*?)(?:\s+\-\s+(?<description>.*))?$/)
              description = match[:description]
              {
                version: match[:version],
                description: description.nil? || description.length == 0 ? nil : match[:description]
              }
            end
          end
          OpenStruct.new(beta)
        end
      end
    end
  end
end
