module Docks
  module Processors
    class JoinWithBlanks < Base
      # Public: Processes the passed content by joining it with blanks.
      #
      # content - An Array representing the parsed result.
      #
      # Examples
      #
      #   JoinWithBlanks.process(['one', 'two', 'three'])
      #   # => 'onetwothree'
      #
      # Returns the processed string.

      def self.process(content)
        return content unless content.kind_of?(Array)

        content = content.join('')
        content.strip.length > 0 ? content : nil
      end
    end
  end
end
