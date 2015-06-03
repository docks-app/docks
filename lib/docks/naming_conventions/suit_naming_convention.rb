require_relative "base_naming_convention.rb"

module Docks
  module Naming
    module Conventions
      class SUIT < Base
        STATEFUL_WORDS = %w(is)

        def base_component(component_name)
          component_name.split("-").first
        end

        def base_component?(component_name)
          component_name == base_component(component_name)
        end

        def component(component_name)
          component_name.gsub(/--[^\-]*/, "")
        end

        def parent_component(component_name)
          component_name = component(component_name)
          component_name.sub(/-[^\-]*$/, "")
        end

        def clean_variation_name(variation_name, component_name)
          return variation_name if disconnected_state?(variation_name)
          variation_name = variation_name.sub(Regexp.new("^(?:#{component_name})?(?:--)?"), "")
          "#{component_name}--#{variation_name}"
        end

        def state?(state_name)
          state_name = state_name.split("--").last
          STATEFUL_WORDS.any? { |word| state_name.start_with?(word) }
        end

        def variant?(variant_name)
          variant_name.split("--").length > 1 && !state?(variant_name)
        end

        def disconnected_state?(state_name)
          state?(state_name) && !state_name.include?("--")
        end
      end
    end
  end
end
