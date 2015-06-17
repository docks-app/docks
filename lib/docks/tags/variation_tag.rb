require_relative "base_tag.rb"

module Docks
  module Tags
    class Variation < Base
      def initialize
        @name = :variation
        @parseable = false
      end

      def setup_post_processors
        after_each_pattern(:early) do |pattern|
          join_variations_to_components(pattern)
          clean_variation_names(pattern)
        end

        after_each_pattern(:late) do |pattern|
          pattern.components.each { |component| mirror_preclusions(component) }
        end
      end

      protected

      def mirror_preclusions(component)
        variations = component.variations
        variations.each do |variation|
          precludes = variation.precludes
          name = variation.name

          variations.select { |other| precludes.include?(other.name) }.each do |other|
            other.precludes << name unless other.precludes.include?(name)
          end
        end

        component.subcomponents.each { |subcomponent| mirror_preclusions(subcomponent) }
      end

      def clean_variation_names(pattern)
        pattern.components.each do |component|
          clean_component_variation_names(component)
        end
      end

      def clean_component_variation_names(component)
        component.variations.each do |variation|
          component_name = component.name
          variation.name = Naming.convention.clean_variation_name(variation.name, component_name)

          [:activate_with, :precludes].each do |need_name_fix|
            variation[need_name_fix].map! { |item| Naming.convention.clean_variation_name(item, component_name) }
          end
        end

        component.subcomponents.each { |subcomponent| clean_component_variation_names(subcomponent) }
      end

      def join_variations_to_components(pattern)
        orphan_variations = pattern.symbols_of_type(Types::Symbol::STATE) + pattern.symbols_of_type(Types::Symbol::VARIANT)
        @new_components = []
        @components = pattern.components

        orphan_variations.each do |variation|
          component = component_for_variation(pattern, variation)
          component[variation.symbol_type] << variation
          pattern.remove(variation)
        end

        pattern.add(:style, @new_components)
        @new_components = @components = nil
        pattern
      end

      def component_for_variation(pattern, variation)
        component_name = Naming.convention.component(variation.name)

        component = nil
        (@components + @new_components).each do |check_component|
          component = check_component.find(component_name)
          break if component
        end

        if component.nil?
          component = Containers::Component.new(name: component_name)
          @new_components << component
        end

        component
      end

      def break_apart_variation_details(content)
        content = Array(content) unless content.kind_of?(Array)

        multiline_description(content) do |item|
          match = item.match(/\s*\.?(?<class>[\$a-zA-Z\-\_]*)(?:\s*(?<details>\(.*\)))?(?:\s*\-?\s*(?<description>.*))?/m)
          return nil if match.nil?

          description = match[:description]
          result = {
            name: match[:class],
            description: description.nil? || description.length == 0 ? nil : match[:description],
            activate_with: [],
            precludes: [],
            set_by: [],
            include_with: [],
            demo_type: Docks::Types::Demo::DEFAULT,
            javascript_action: nil,
            active: false
          }

          unless match[:details].nil?
            details = parenthetical_options(match[:details], :demo_type)
            result.merge!(details)

            result[:demo_type] = ensure_valid_demo_type(result[:demo_type])
            result[:active] = stringy_boolean(result[:active])

            [
              :activate_with,
              :precludes,
              :include_with
            ].each do |array_param|
              result[array_param] = split_on_characters(result[array_param], "\s\|")
            end

            result[:set_by] = split_on_top_level_parens_commas_and_pipes(result[:set_by]).map do |setter|
              name_and_parenthetical(setter, :setter, :constant)
            end
          end

          result
        end
      end
    end
  end
end
