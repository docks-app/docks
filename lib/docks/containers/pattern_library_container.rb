module Docks
  module Containers
    class PatternLibrary
      attr_reader :patterns

      def initialize
        @patterns = {}
      end

      def <<(pattern)
        @patterns[pattern.name.to_s] ||= pattern
      end

      def [](pattern_name)
        @patterns[pattern_name.to_s]
      end

      def has_pattern?(pattern_name)
        !@patterns[pattern_name.to_s].nil?
      end

      def to_json; @patterns.to_json end

      def group_by(grouper, &block)
        grouped_patterns = {}
        grouper = grouper.to_sym

        @patterns.each do |name, pattern|
          grouper_value = pattern.send(grouper)
          next if grouper_value.nil?
          grouped_patterns[grouper_value] ||= []
          grouped_patterns[grouper_value] << pattern
        end

        if block_given?
          grouped_patterns.each(&block)
        else
          grouped_patterns
        end
      end

      def groups(&block)
        group_by(:group, &block)
      end

      def find(descriptor)
        descriptor = Naming.parse_descriptor(descriptor)

        pattern_name = descriptor[:pattern]
        pattern_name = descriptor.delete(:symbol) if pattern_name.nil?
        return if pattern_name.nil?

        pattern = @patterns[pattern_name]
        return if pattern.nil?

        symbol = pattern.find(descriptor)
        OpenStruct.new(pattern: pattern, symbol: symbol)
      end
    end
  end
end
