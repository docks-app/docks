module Docks
  module Processors
    class BreakApartTypes < Base
      # Public: Processes the passed content by splitting it on type-delimitting
      # symbols ({/} to declare the type, ,/|/\s to separate them).
      #
      # content - An Array or String representing the parsed result.
      #
      # Examples
      #
      #   BreakApartTypes.process('{String, Array}')
      #   # => ['String', 'Array']
      #
      #   BreakApartTypes.process(['{String}', '{Array | Object}'])
      #   # => ['String', 'Array', 'Object']
      #
      # Returns an Array of types.

      def self.process(content)
        content = JoinWithBlanks.process(content) if content.kind_of?(Array)
        return Array.new unless content.kind_of?(String)
        content = content.strip.gsub(/\}\s*\{/, ', ').gsub(/[\{\}]/, '')
        BreakApartOnCharacters.process(content, "\|\,\s")
      end
    end
  end
end
