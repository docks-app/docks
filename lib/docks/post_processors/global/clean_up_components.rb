module Docks
  module PostProcessors
    class CleanUpComponents < Base
      def self.post_process(parsed_file)
        parsed_file.each do |parse_result|
          next unless parse_result[:symbol_type] == Docks::Types::Symbol::COMPONENT
          parse_result[:state] ||= []
          parse_result[:variant] ||= []
        end

        parsed_file
      end
    end
  end
end
