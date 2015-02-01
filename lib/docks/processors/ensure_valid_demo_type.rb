module Docks
  module Processors
    class EnsureValidDemoType
      # Public: Processes the passed content by returning it if it's a valid
      # demo type, and otherwise returning the default demo type.
      #
      # content - A string representing the desired demo type.
      #
      # Examples
      #
      #   EnsureValidDemoType.process(Docks::Types::Demo::SELECT)
      #   # => "select"
      #
      #   EnsureValidDemoType.process("foo")
      #   # => "none"
      #
      # Returns the processed string.

      def self.process(content)
        @@demo_types ||= Docks::Types::Demo.constants.map { |const| Docks::Types::Demo.const_get(const) }
        @@demo_types.include?(content) ? content : Docks::Types::Demo::DEFAULT
      end
    end
  end
end
