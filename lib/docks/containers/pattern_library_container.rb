module Docks
  module Containers
    class PatternLibrary
      attr_reader :patterns

      def initialize
        @patterns = {}
        @summary = false
      end

      def <<(pattern)
        @patterns[pattern.name.to_s] ||= pattern
      end

      def [](pattern_name)
        @patterns[Docks.pattern_id(pattern_name)]
      end

      def has_pattern?(pattern_name)
        !self[pattern_name].nil?
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
        descriptor = Descriptor.new(descriptor, assume: :pattern)
        pattern = @patterns[descriptor.pattern]
        return false if pattern.nil?

        symbol = pattern.find(descriptor)
        symbol = nil if !symbol || symbol == pattern
        ::OpenStruct.new(pattern: pattern, symbol: symbol)
      end

      def summarized?; @summary end
      alias_method :summary?, :summarized?

      def summary
        return self if summarized?

        summary = self.class.new
        summary.instance_variable_set(:@summary, true)
        summary.instance_variable_set(:@patterns, Hash[@patterns.map { |name, pattern| [name, pattern.summary] }])
        summary
      end
      alias_method :summarize, :summary

      def summary!
        @summary = true
        @patterns = Hash[@patterns.map { |name, pattern| pattern.summary }]
      end
      alias_method :summarize!, :summary!
    end
  end
end
