module Docks
  module Processors
    class BreakApartOnCharacters < Base
      # Public: Processes the passed content splitting it on type-delimitting
      # symbols ({/} to declare the type, ,/|/\s to separate them).
      #
      # content  - The String to break apart.
      # split_on - The characters, passed as a single String or an Array of Strings,
      #            on which the content string should be split. Defaults to "\,\s".
      #
      # Examples
      #
      #   BreakApartOnCharacters.process('String, Array', "\s\,")
      #   # => ['String', 'Array']
      #
      #   BreakApartOnCharacters.process('{Array |   Object, String}', ["\s", "\,", "\|"])
      #   # => ['String', 'Array', 'Object']
      #
      # Returns an Array with the split pieces.

      def self.process(content, split_on="\,\s")
        return content unless content.kind_of?(String)

        split_on = split_on.join('') if split_on.kind_of?(Array)
        return content unless split_on.kind_of?(String)

        content = content.split(/[#{split_on}]/).select { |piece| piece.length > 0 }
      end
    end
  end
end
