module Docks
  module PostProcessors
    class AddFriendlyPresentations < Base
      def self.post_process(parsed_file)
        parsed_file.each do |parse_result|
          parse_result[:friendly_presenter] ||= Docks.current_language.friendly_presentation(parse_result)
        end

        parsed_file
      end
    end
  end
end
