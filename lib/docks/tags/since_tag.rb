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

      def process(symbol)
        symbol.update(@name) do |since|
          since = multiline_description(since) do |first_line|
            if match = first_line.match(/\s*(?<version>[0-9a-zA\.\-_]*)(?:\s+\-?\s*(?<description>.*))?/)
              description = match[:description]
              {
                version: match[:version],
                description: description.nil? || description.length == 0 ? nil : match[:description]
              }
            end
          end

          OpenStruct.new(since)
        end
      end
    end
  end
end
