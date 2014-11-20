module Docks
  module PostProcessors
    class CleanUpVariantsAndStates < Base

      # Public: Cycles through all variants and states of each component
      # and performs general cleanup. This includes setting all defaults for
      # the states/ variants, cleaning up any names that start with '--'
      # (by prepending the base class name), and adding the base class to the
      # list of tabs to activate_with for the component.
      #
      # parsed_file - The processed result of parsing the file.
      #
      # Returns the parse results with all states/ variants cleaned up.

      def self.post_process(parsed_file)
        parsed_file.each do |parse_result|
          next unless parse_result[:type] == Docks::Types::Symbol::COMPONENT

          default = {
            demo_type: Docks::Types::Demo::DEFAULT,
            active: 'false',
            description: nil,
            activate_with: [],
            precludes: [],
            set_by: [],
            include_with: [],
            javascript_action: nil
          }

          parse_result[:variants] ||= []
          parse_result[:states] ||= []

          (parse_result[:variants] + parse_result[:states]).each do |item|
            item[:base_class] = parse_result[:name]
            item[:name] = clean_class_name(item[:name], item[:base_class])
            item.merge!(default) { |k, passed, default| passed || default }
            item[:activate_with].push(item[:base_class])

            [:activate_with, :precludes, :include_with].each do |arr_attr|
              item[arr_attr].map! { |arr_attr_item| clean_class_name(arr_attr_item, item[:base_class]) }
              item[arr_attr].uniq!
            end
          end
        end
      end



      private

      # Private: Cleans up the class name by prepending `base_class` if
      # necessary and removing any non-class name characters from the start.
      #
      # name       - The existing class name.
      # base_class - The base class for the existing component.
      #
      # Examples
      #
      #   CleanUpVariantsAndStates.clean_class_name('--is-active', 'tab')
      #   # => 'tab--is-active'
      #
      #   CleanUpVariantsAndStates.clean_class_name('tab--is-active', 'tab')
      #   # => 'tab--is-active'
      #
      #   CleanUpVariantsAndStates.clean_class_name('&.tab--is-active', 'tab')
      #   # => 'tab--is-active'
      #
      # Returns the cleaned class name.

      def self.clean_class_name(name, base_class)
        name = "#{base_class}#{name}" if name.start_with?('--')
        name.gsub(/^[^a-zA-Z_0-9]*/, '')
      end
    end
  end
end
