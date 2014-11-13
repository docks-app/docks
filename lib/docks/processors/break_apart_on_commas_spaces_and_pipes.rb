module Docks
  module Processors
    class BreakApartOnCommasSpacesAndPipes < Base
      # Public: Processes the passed content by splitting it on commas,
      # spaces, and pipes (and removing associated whitespace).
      #
      # content - An Array or String representing the parsed result.
      #
      # Examples
      #
      #   BreakApartOnCommasAndPipes.process('String, Array | Object')
      #   # => ['String', 'Array']
      #
      #   BreakApartOnCommasAndPipes.process(['String, Array', 'Object of type nil'])
      #   # => ['String', 'Array', 'Object', 'of', 'type', 'nil']
      #
      # Returns an Array of the split results.

      def self.process(content)
        content = content.join("\s") if content.kind_of?(Array)
        BreakApartOnCharacters.process(content, [',', '|', "\s"])
      end
    end
  end
end
