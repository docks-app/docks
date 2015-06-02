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

      def process(symbol)
        symbol.update(@name) do |returns|
          returns = multiline_description(returns) do |first_line|
            first_line.strip!
            if match = first_line.match(/nothing\s*\-?\s*(?<description>.*)/i)
              { description: match[:description] }

            else
              match = first_line.match(/\{?(?<type>[^\}\-]*)\}?(?:\s*\-?\s*(?<description>.*))?/)
              {
                types: split_types(match[:type].strip),
                description: match[:description]
              }
            end
          end

          returns[:types] = nil if Array(returns[:types]).empty?
          OpenStruct.new(returns)
        end
      end
    end
  end
end
