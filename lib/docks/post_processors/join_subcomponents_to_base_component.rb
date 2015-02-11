module Docks
  module PostProcessors
    class JoinSubcomponentsToBaseComponent < Base

      def self.post_process(parsed_file)
        new_base_components = []

        parsed_file.each do |parse_result|
          next unless parse_result[:symbol_type] == Docks::Types::Symbol::COMPONENT

          base_class = base_class(parse_result[:name])
          next if parse_result[:name] == base_class

          base_component = parsed_file.select { |result| result[:name] == base_class }.first

          if base_component.nil?
            base_component = new_base_components.select { |result| result[:name] == base_class }.first

            if base_component.nil?
              base_component = { name: base_class, symbol_type: Docks::Types::Symbol::COMPONENT }
              new_base_components << base_component
            end
          end

          base_component[:subcomponents] ||= []
          base_component[:subcomponents] << parse_result.dup
          parse_result[:delete] = true
        end

        parsed_file.delete_if { |parse_result| parse_result[:delete] }
        parsed_file.concat(new_base_components)
      end


      private

      def self.base_class(name)
        name.split("--").first.split("__").first
      end
    end
  end
end
