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

      def process(symbol)
        symbol.update(@name) do |deprecated|
          deprecated = multiline_description(deprecated) do |first_line|
            if match = first_line.match(/\s*(?<version>.*?)(?:\s+\-\s+(?<description>.*))?$/)
              description = match[:description]
              {
                version: match[:version],
                description: description.nil? || description.length == 0 ? nil : match[:description]
              }
            end
          end

          OpenStruct.new(deprecated)
        end
      end
    end
  end
end
