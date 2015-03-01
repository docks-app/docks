require File.expand_path("../base_container.rb", __FILE__)

module Docks
  module Containers

    # Public: a container for demos. This is a special type of container in
    # that it does not correspond directly to a symbol from the parse results.
    # Instead, it encapsulates and provides helper methods for sets of
    # components that require a demo.

    class Demo

      # Public: the type of symbols that should be encapsulated by this
      # container. This is compared against a symbol's `symbol_type` to
      # determine which container to use.
      #
      # Returns the type String.

      def self.type; Docks::Types::Symbol::DEMO end

      attr_reader :component, :name

      # Public: initializes a new demo.

      def initialize(component)
        @component = component
        @name = component.name
      end

      # Public: collects all variations on the components that are being demo'ed
      # that were specified to be "select" types. The optional options Hash
      # allows you to choose whether or not to group the result by base class
      # (using the `group_by_component` key of `true`), in which case the
      # result will be a Hash of Arrays where the keys are the base classes.
      # Otherwise, a simple Array of variation symbols is returned.
      #
      # options - A hash of options. Defaults to {}.
      #
      # Returns a Hash or Array of "select"-type variations, depending on the
      # value of the `group_by_component` option.

      def select_variations(options = {})
        variations_of_type(Docks::Types::Demo::SELECT, options)
      end

      # Public: collects all the variations of the demo'ed components that
      # should be presented as joint demos.
      #
      # Returns an Array of "joint"-type variations.

      def joint_variations
        variations_of_type(Docks::Types::Demo::JOINT)
      end



      private

      # Private: Collects all variations of components in this demo whose
      # `demo_type` has been set to the passed `type`.
      #
      # type    - a String of the demo type to search for.
      # options - an optional options Hash. Default is {}.
      #
      # Returns a Hash or Array of variations matching the passed type,
      # depending on the value of the `group_by_component` option.

      def variations_of_type(type, options = {})
        group_by_component = options[:group_by_component]
        matches = group_by_component ? {} : []

        return matches unless @component.symbol_type == Docks::Types::Symbol::COMPONENT

        ([@component] + @component.subcomponents + @component.included_symbols).each do |a_component|
          if demo_type = a_component.demo_type
            next unless demo_type == type

            if group_by_component
              matches[a_component.base_class] ||= []
              matches[a_component.base_class] << a_component
            else
              matches << a_component
            end

            next
          end

          component_name = a_component.name
          a_component.variations.each do |v|
            next unless v.demo_type == type

            if group_by_component
              matches[component_name] ||= []
              matches[component_name] << v
            else
              matches.push << v
            end
          end
        end

        matches
      end
    end
  end
end
