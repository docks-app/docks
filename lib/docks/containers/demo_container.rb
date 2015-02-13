module Docks
  module Containers
    class Demo
      def self.type; Docks::Types::Symbol::DEMO end

      attr_reader :component, :name

      def initialize(component)
        @component = component
        @name = component.name
      end

      def select_variations(options = {})
        variations_of_type(Docks::Types::Demo::SELECT, options)
      end

      def joint_variations
        variations_of_type(Docks::Types::Demo::JOINT)
      end

      private

      def variations_of_type(type, options = {})
        group_by_component = options[:group_by_component]
        matches = group_by_component ? {} : []

        component_name = @component.name
        @component.variations.each do |v|
          if v.demo_type == type
            if group_by_component
              matches[component_name] ||= []
              matches[component_name].push(v)
            else
              matches.push(v)
            end
          end
        end

        matches
      end
    end
  end
end
