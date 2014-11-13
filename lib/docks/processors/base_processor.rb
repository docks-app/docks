module Docks
  module Processors
    class Base
      # Public: Processes the passed content.
      #
      # content - An Array representing the parsed result.
      #
      # Examples
      #
      #   Base.process(['one', 'two'])
      #   # => ['one', 'two']
      #
      # Returns the passed array.

      def self.process(content)
        content
      end
    end
  end
end
