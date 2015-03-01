require File.expand_path("../base_container.rb", __FILE__)

module Docks
  module Containers

    # A container for an entire pattern. This includes all of the parse results
    # from a given group, plus additional metadata about the pattern.

    class Pattern < Base

      # Public: the type of symbols that should be encapsulated by this
      # container. This is compared against a symbol's `symbol_type` to
      # determine which container to use.
      #
      # Returns the type String.

      def self.type; Docks::Types::Symbol::PATTERN end

      attr_reader :demos, :modified, :name, :title, :files
      alias_method :demo, :demos

      # Public: initializes a new pattern. This includes setting up the `name`,
      # `title`, and `modified` instance variables, as well as setting the
      # pattern block as the one to which missing methods should be delegated
      # (so that you can ask for the global details of this pattern directly
      # from this container).

      def initialize(parse_results)
        @parse_results = parse_results

        @pattern = parse_results[:pattern]
        super(@pattern)

        @files = parse_results[:files]
        @modified = Date.parse(parse_results[:modified])
        @name = parse_results[:name].to_s
        @title = @pattern[:title] || @name

        build_containers
        build_demos
      end

      # Public: checks whether or not there are markup-related parse symbols.
      # Returns a boolean.

      def has_markup?
        @parse_results[Docks::Types::Languages::MARKUP].length > 0 ||
        @parse_results[Docks::Types::Languages::STYLE].length > 0
      end

      # Public: checks whether or not there are script-related parse symbols.
      # Returns a boolean.

      def has_behavior?
        @parse_results[Docks::Types::Languages::SCRIPT].length > 0
      end

      # Public: retrieves all of the symbols of the passed type, optionally
      # filtered with the passed options Hash.
      #
      # type    - The type of symbols to retrieve.
      # options - A hash of options to filter the returned results. Pass an
      #           array of file types as the `:include` key to limit results to
      #           only symbols from those file types. The opposite can be done
      #           with the `:exclude` key.
      #
      # Returns an Array of symbols (in their respective containers).

      def parse_results_of_type(type, options = {})
        type = type.to_s
        included = options[:include].nil? ? Docks::Cache::PARSE_RESULT_TYPES : [options[:include]].flatten
        excluded = options[:exclude].nil? ? [] : [options[:exclude]].flatten

        Docks::Cache::PARSE_RESULT_TYPES.inject([]) do |matches, parse_result_type|
          if included.include?(parse_result_type) && !excluded.include?(parse_result_type)
            new_results = @parse_results[parse_result_type].select do |parse_result|
              parse_result.symbol_type.to_s == type
            end

            matches.concat(new_results)
          end

          matches
        end
      end

      # For each top level symbol, this block creates a convenience method for
      # accessing parse results of that type. For example, retrieving all
      # component symbols is assigned to `#components`. As with
      # #parse_results_of_type, an options hash can be passed to explicitly
      # include/ exclude symbols from certain parse result types.

      Docks::Containers::TOP_LEVEL_SYMBOLS.each do |symbol|
        define_method(symbol.pluralize.to_sym) do |options = {}|
          parse_results_of_type(symbol, options)
        end
      end

      Docks::Cache::PARSE_RESULT_TYPES.each do |parse_result_type|
        define_method("#{parse_result_type}_symbols".to_sym) do
          @parse_results[parse_result_type]
        end
      end

      # Public: Retrieves the demo associated with the component of the passed
      # name, or nil if none exists.
      #
      # demo_name - The name of the base component for the desired demo.
      #
      # Returns a Demo container or nil.

      def demo_for(demo_name)
        @demos.select { |demo| demo.name == demo_name }.first
      end

      # All of this methods are overriden from their Base defaults because we
      # want to provide details for the whole pattern when prompted for these,
      # but want the missing methods to be delegated to only the pattern
      # symbol.

      def to_s; @parse_results.to_s end
      def inspect; to_s end
      def to_json(options = nil); @parse_results.to_json(options) end



      private

      # Private: wraps all of the top-level symbols in their associated
      # containers.
      #
      # Returns nothing.

      def build_containers
        Docks::Cache::PARSE_RESULT_TYPES.each do |parse_result_type|
          @parse_results[parse_result_type].map! do |parse_result|
            Docks::Containers.container_for(parse_result).new(parse_result)
          end
        end

        components.each do |component|
          component.subcomponents.map! do |subcomponent|
            Docks::Containers::Component.new(subcomponent)
          end

          component.included_symbols.map! do |included_symbol|
            if included_symbol.kind_of?(OpenStruct)
              included_symbol
            else
              Docks::Containers::Component.new(included_symbol)
            end
          end
        end
      end

      # Private: wraps a demo container around sets of components that indicate
      # that they should have an associated demo.
      #
      # Returns nothing.

      def build_demos
        @demos = []
        components.each do |component|
          @demos << Demo.new(component) if component.has_demo?

          component.variations.each do |variation|
            @demos << Demo.new(variation) if variation.demo_type == Docks::Types::Demo::OWN
          end
        end
      end
    end
  end
end
