module Docks
  module Processors
    class JoinWithLineBreaks < Base
      # Public: Processes the passed content by joining it with new lines.
      #
      # content - An Array representing the parsed result.
      #
      # Examples
      #
      #   JoinWithLineBreaks.process(['one', 'two', 'three'])
      #   # => "one\ntwo\nthree"
      #
      # Returns the processed string.

      def self.process(content)
        return content unless content.kind_of?(Array)

        content = content.join("\n").strip
        content.length > 0 ? content : nil
      end
    end
  end
end
