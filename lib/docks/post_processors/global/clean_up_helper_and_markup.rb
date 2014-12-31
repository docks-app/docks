module Docks
  module PostProcessors
    class CleanUpHelperAndMarkup < Base
      def self.post_process(parsed_file)
        parsed_file.each do |parse_result|
          next unless parse_result[:type] == Docks::Types::Symbol::COMPONENT
          markup_present, helper_present = !parse_result[:markup].nil?, !parse_result[:helper].nil?
          next unless markup_present && helper_present

          unless parse_result[:markup].index(parse_result[:helper]).nil?
            parse_result[:helper] = parse_result[:markup]
            parse_result[:markup] = nil
          end
        end

        parsed_file
      end
    end
  end
end
