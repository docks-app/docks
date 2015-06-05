module Docks
  module Tags
    class Subcomponent < Base
      def initialize
        @name = :subcomponent
        @parseable = false
      end

      def setup_post_processors
        after_each_pattern(:middle) do |pattern|
          join_subcomponents_to_parent(pattern)
        end
      end

      private

      def join_subcomponents_to_parent(pattern)
        @components = pattern.components.dup
        @new_components = []

        @components.each do |component|
          parent_component = find_parent_component(component)
          next if parent_component.nil?

          parent_component.subcomponents << component unless parent_component.subcomponents.include?(component)
          pattern.remove(component)
        end

        pattern.add(:style, @new_components)
        @components = @new_components = nil
        pattern
      end

      def find_parent_component(component)
        parent_component_name = Naming.convention.parent_component(component.name)
        return if parent_component_name == component.name

        created_component = false
        parent_component = nil
        (@components + @new_components).each do |possible_parent|
          parent_component = possible_parent.find(parent_component_name)
          break unless parent_component.nil?
        end

        if parent_component.nil?
          parent_component = Containers::Component.new(name: parent_component_name)
          created_component = true
        end

        # Create all necessary ancestors
        last_parent = parent_component
        grandparent = find_parent_component(parent_component)

        if created_component && grandparent.nil? && !@new_components.include?(parent_component)
          @new_components << parent_component
        end

        loop do
          break if grandparent.nil? || grandparent.subcomponents.include?(last_parent)
          grandparent.subcomponents << last_parent
          grandparent = find_parent_component(grandparent)
        end
        parent_component
      end
    end
  end
end
