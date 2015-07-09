module Docks
  module Tags
    class IncludeWith < Base
      def initialize
        @name = :include_with
        @multiline = false
        @multiple_allowed = true
      end

      def process(symbol)
        symbol.update(@name) do |include_with|
          Array(include_with).map { |with| split_on_commas_spaces_and_pipes(with) }.flatten
        end
      end

      def setup_post_processors
        after_each_pattern(:late) do |pattern|
          components = pattern.components
          components.each { |component| find_and_associate_inclusion(component, components) }
        end
      end

      private

      def find_and_associate_inclusion(component, components)
        include_withs = component.fetch(:include_with, [])
        unless include_withs.empty?
          components.each do |other|
            next unless include_withs.include?(other.name)
            other.included_symbols ||= []
            other.included_symbols << component
          end
        end

        component.variations do |variation|
          include_withs = variation.fetch(:include_with, [])
          next if include_withs.empty?
          components.each do |other|
            next unless include_withs.include?(other.name)
            other.included_symbols ||= []
            other.included_symbols << variation
          end
        end

        component.subcomponents { |subcomponent| find_and_associate_inclusion(subcomponent, components) }
      end
    end

    class IncludedSymbol < Base
      def initialize
        @name = :included_symbol
        @parseable = false
      end
    end
  end
end
