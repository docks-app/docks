module Docks
  module Tags
    class For < Base
      def initialize
        @name = :for
        @multiline = false
      end

      def setup_post_processors
        after_each_pattern(:late) do |pattern|
          pattern.components.each { |component| set_for_on_component_variations(component) }
          (pattern.factories + pattern.classes).each { |classlike| set_for_on_classlikes(classlike) }
        end
      end

      protected

      def set_for_on_component_variations(component)
        component.variations.each { |variation| variation.for = component.name }
        component.subcomponents.each { |subcomponent| set_for_on_component_variations(subcomponent) }
      end

      def set_for_on_classlikes(classlike)
        (classlike.fetch(:properties, []) + classlike.fetch(:methods, [])).each do |prop|
          prop.for = classlike.name
        end
      end
    end
  end
end
