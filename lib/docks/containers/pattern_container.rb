require File.join(File.dirname(__FILE__), "base_container.rb")

module Docks
  module Containers
    class Pattern < Base
      def self.type; Docks::Types::Symbol::PAGE end

      attr_reader :demos, :modified, :name, :title
      alias_method :demo, :demos

      def initialize(parse_results)
        @parse_results = parse_results

        find_pattern_block
        super(@pattern)

        @modified = Date.parse(parse_results[:modified])
        @name = parse_results[:name].to_s
        @title = @pattern.page || @name

        build_containers
        build_demos
      end

      def to_s
        @parse_results.to_s
      end

      def inspect
        to_s
      end

      def to_json(options = nil)
        @parse_results.to_json(options)
      end

      def has_markup?
        @parse_results[Docks::Types::Languages::MARKUP].length > 0 ||
        @parse_results[Docks::Types::Languages::STYLE].length > 0
      end

      def has_behavior?
        @parse_results[Docks::Types::Languages::SCRIPT].length > 0
      end

      def parse_results_of_type(type, options = {})
        type = type.to_s
        included = options[:include].nil? ? Docks::Cache::PARSE_RESULT_TYPES : [options[:include]].flatten
        excluded = options[:exclude].nil? ? [] : [options[:exclude]].flatten
        remove = options[:remove]

        Docks::Cache::PARSE_RESULT_TYPES.inject([]) do |matches, parse_result_type|
          if included.include?(parse_result_type) && !excluded.include?(parse_result_type)
            if remove
              new_results, @parse_results[parse_result_type] = @parse_results[parse_result_type].partition do |parse_result|
                parse_result.symbol_type.to_s == type
              end
            else
              new_results = @parse_results[parse_result_type].select do |parse_result|
                parse_result.symbol_type.to_s == type
              end
            end

            matches.concat(new_results)
          end

          matches
        end
      end

      def demo_for(demo_name)
        @demos.select { |demo| demo.name == demo_name }.first
      end

      Docks::Containers::TOP_LEVEL_SYMBOLS.each do |symbol|
        define_method(symbol.pluralize.to_sym) do |options = {}|
          parse_results_of_type(symbol, options)
        end
      end

      private

      def build_containers
        Docks::Cache::PARSE_RESULT_TYPES.each do |parse_result_type|
          @parse_results[parse_result_type].map! do |parse_result|
            Docks::Containers.container_for(parse_result).new(parse_result)
          end
        end
      end

      def build_demos
        @demos = []
        components.each do |component|
          @demos << Demo.new(component) if component.has_demo?
        end
      end

      def find_pattern_block
        pattern_results = parse_results_of_type(Docks::Types::Symbol::PAGE, remove: true)
        @pattern = pattern_results.first || OpenStruct.new
      end
    end
  end
end
