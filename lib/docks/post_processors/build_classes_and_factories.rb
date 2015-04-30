module Docks
  module PostProcessors
    class BuildClassesAndFactories < Base
      def self.post_process(parsed_file)
        last_object = nil

        parsed_file.each do |parse_result|
          if parse_result[:class] || parse_result[:factory]
            last_object = parse_result
            parse_result[:methods] ||= []
            parse_result[:properties] ||= []
            parse_result[:symbol_type] = parse_result[:class] ? Types::Symbol::CLASS : Types::Symbol::FACTORY
          end

          if parse_result[:method]
            last_object[:methods] << parse_result
          end

          if parse_result[:property]
            last_object[:properties] << parse_result
          end
        end

        parsed_file.delete_if { |parse_result| parse_result[:method] || parse_result[:property] }
      end
    end
  end
end
