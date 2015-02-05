module Docks
  module PostProcessors
    class JoinOrphanedVariantsAndStates < Base

      # Public: Joins up any states and variants that were declared in their own,
      # separate comment block with the relevant component (or, creates a component
      # if one doesn't already exist).
      #
      # parsed_file - The processed result of parsing the file.
      #
      # Examples
      #
      #   JoinOrphanedVariantsAndStates.post_process([{ name: 'tab', type: 'component' }, { name: 'tab--is-active', type: 'variant' }])
      #   # => [{ name: 'tab', type: 'component', variants: [{ name: 'tab--is-active', type: 'variant' }] }]
      #
      #   JoinOrphanedVariantsAndStates.post_process([{ name: 'button', type: 'component' }, { name: 'tab--is-active', type: 'variant' }])
      #   # => [{ name: 'button', type: 'component' }, { name: 'tab', type: 'component', variants: [{ name: 'tab--is-active', type: 'variant' }] }]
      #
      # Returns the parse results with all states/ variants joined to their component
      # and the new components added in.

      def self.post_process(parsed_file)
        last_component = nil
        new_parse_results = []
        variant_and_state_types = [Docks::Types::Symbol::STATE, Docks::Types::Symbol::VARIANT]

        parsed_file.each do |parse_result|
          last_component = parse_result if parse_result[:symbol_type] == Docks::Types::Symbol::COMPONENT
          next unless variant_and_state_types.include?(parse_result[:symbol_type])

          new_item = parse_result.clone
          type = new_item[:symbol_type].to_sym
          base_class = base_class(new_item[:name]) || last_component[:name]

          if !last_component.nil? && base_class == last_component[:name]
            # Join with the last component if the base class name matches
            last_component[type] ||= []
            last_component[type] << new_item

          else
            existing_component = parsed_file.select { |result| result[:name] == base_class }.first
            if existing_component.nil?
              # No component in the file matches this base class

              # Check if there is already a new parse result for this base class
              # if there is, append to it. Otherwise, add a new component.
              new_component = new_parse_results.select { |new_result| new_result[:name] == base_class }.first
              if new_component.nil?
                new_component = {
                  name: base_class,
                  symbol_type: Docks::Types::Symbol::COMPONENT,
                  variant: [],
                  state: []
                }

                new_parse_results << new_component
              end

              new_component[type] << new_item
            else
              # Another component matches this base class
              existing_component[type] ||= []
              existing_component[type] << new_item
            end
          end
        end

        # Get rid of all the states and variants.
        parsed_file.delete_if { |parse_result| variant_and_state_types.include?(parse_result[:symbol_type]) }
        parsed_file.concat(new_parse_results)
      end


      private

      def self.base_class(name)
        return nil if name.start_with?('--')
        name.split('--').first
      end
    end
  end
end
