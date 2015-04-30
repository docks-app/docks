module Docks
  module PostProcessors
    class CleanUpAccess < Base
      def self.post_process(parsed_file)
        last_class = nil

        parsed_file.each do |parse_result|
          parse_result[:access] ||= (parse_result[:private] ? Types::Access::PRIVATE : Types::Access::PUBLIC)
          parse_result.delete(:public)
          parse_result.delete(:private)
        end

        parsed_file
      end
    end
  end
end
