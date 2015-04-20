module Docks
  module PostProcessors
    class BuildClasses < Base
      def self.post_process(parsed_file)
        last_class = nil

        parsed_file.each do |parse_result|
          if parse_result[:class]
            last_class = parse_result
            parse_result[:methods] ||= []
            parse_result[:symbol_type] = Types::Symbol::CLASS
          end

          if parse_result[:method]
            last_class[:methods] << parse_result
          end
        end

        parsed_file.delete_if { |parse_result| parse_result[:method] }
      end
    end
  end
end
