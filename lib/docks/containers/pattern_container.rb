require_relative "base_container.rb"

module Docks
  module Containers
    class Pattern < Base
      extend Forwardable

      def self.type; Types::Symbol::PATTERN end

      SYMBOL_SOURCES = [
        Types::Languages::STYLE,
        Types::Languages::SCRIPT
      ]

      attr_accessor :modified, :files, :name
      def_delegators :@symbols, :to_s, :inspect, :to_json

      def initialize(name)
        super()
        @name = name
        @symbols = {}
        @files = []

        SYMBOL_SOURCES.each do |source|
          @symbols[source] = []
        end
      end

      def add(source, symbols)
        pattern_symbol, regular_symbols = Array(symbols).partition { |symbol| !symbol.pattern.nil? }

        unless pattern_symbol.empty?
          pattern_symbol = pattern_symbol.first
          pattern_symbol[Tags::Title.instance.name] ||= pattern_symbol.delete(Tags::Pattern.instance.name)
          @details.merge!(pattern_symbol.to_h)
        end

        @symbols[source].concat(regular_symbols)
      end

      def remove(remove_symbol)
        SYMBOL_SOURCES.each do |symbol_source|
          @symbols[symbol_source].delete_if { |symbol| symbol == remove_symbol }
        end
      end

      def valid?
        !@details.values.compact.empty? || SYMBOL_SOURCES.any? { |source| !@symbols[source].empty? }
      end

      def ==(other_pattern)
        self.class == other_pattern.class && @symbols == other_pattern.instance_variable_get(:@symbols)
      end

      def title
        @details[Tags::Title.instance.name] || name.capitalize
      end

      def group
        @details[Tags::Group.instance.name] || Types::Symbol::COMPONENT.capitalize
      end

      def structure_symbols
        @symbols[Types::Languages::STYLE]
      end

      alias_method :style_symbols, :structure_symbols

      def has_structure?
        structure_symbols.length > 0
      end

      def behavior_symbols
        @symbols[Types::Languages::SCRIPT]
      end

      alias_method :script_symbols, :behavior_symbols

      def has_behavior?
        behavior_symbols.length > 0
      end

      Containers::TOP_LEVEL_SYMBOLS.each do |symbol|
        define_method(symbol.pluralize.to_sym) do |options = {}|
          symbols_of_type(symbol, options)
        end
      end

      def symbols
        @symbols.values.flatten
      end

      def find(descriptor)
        descriptor = Naming.parse_descriptor(descriptor)
        return unless symbol_name = descriptor[:symbol]

        SYMBOL_SOURCES.each do |source|
          @symbols[source].each do |symbol|
            find_result = nil
            find_result = symbol.find(descriptor) if symbol.respond_to?(:find)
            return find_result unless find_result.nil?
            return symbol if symbol.name == symbol_name
          end
        end

        nil
      end

      def demos
        return @demos unless @demos.nil?

        @demos = []
        components.each do |component|
          @demos << Demo.new(component) if component.has_demo?

          component.variations.each do |variation|
            @demos << Demo.new(variation) if variation.demo_type == Types::Demo::OWN
          end
        end

        @demos
      end

      alias_method :demo, :demos

      def summary
        Summary.new(self)
      end

      def symbols_of_type(type, options = {})
        type = type.to_s
        included = options[:include].nil? ? SYMBOL_SOURCES : [options[:include]].flatten
        excluded = options[:exclude].nil? ? [] : Array(options[:exclude])

        SYMBOL_SOURCES.inject([]) do |matches, source|
          if included.include?(source) && !excluded.include?(source)
            new_results = @symbols[source].select do |symbol|
              symbol.symbol_type.to_s == type
            end

            matches.concat(new_results)
          end

          matches
        end
      end

      protected

      class Summary < Base::Summary
        attr_reader :group, :title

        def initialize(pattern)
          super

          @title = pattern.title
          @group = pattern.group

          @symbols = SYMBOL_SOURCES.inject(Hash.new) do |summarized_symbols, symbol_source|
            pattern.instance_variable_get(:@symbols)[symbol_source].each do |symbol|
              summarized_symbols[symbol.name] ||= symbol.summary
            end

            summarized_symbols
          end
        end

        def find(descriptor)
          descriptor = Naming.parse_descriptor(descriptor)
          return if descriptor[:symbol].nil?
          @symbols[descriptor[:symbol]]
        end

        def ==(other_summary)
          self.class == other_summary.class && @symbols == other_summary.instance_variable_get(:@symbols)
        end
      end
    end
  end
end
