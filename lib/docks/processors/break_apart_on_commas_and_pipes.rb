module Docks
  module Processors
    class BreakApartOnCommasAndPipes < Base
      # Public: Processes the passed content by splitting it on commas
      # and pipes (and removing associated whitespace).
      #
      # content - An Array or String representing the parsed result.
      #
      # Examples
      #
      #   BreakApartOnCommasAndPipes.process('String, Array | Object')
      #   # => ['String', 'Array']
      #
      #   BreakApartOnCommasAndPipes.process(['String, Array', 'Object of type nil'])
      #   # => ['String', 'Array', 'Object of type nil']
      #
      # Returns an Array of the split results.

      def self.process(content)
        content = Array(content) if content.kind_of?(String)
        return content unless content.kind_of?(Array)

        final_content = []
        content.flatten.each do |piece|
          final_content.concat BreakApartOnCharacters.process(piece, [',', '|']).map { |split_piece| split_piece.strip }
        end

        final_content
      end
    end
  end
end
