module Docks
  module PostProcessors
    class AddExtraMetadata < Base
      def self.post_process(parsed_file)
        extension = Docks::Languages.extension_for_file(Docks.current_file)
        parsed_file.each do |parse_result|
          parse_result[:friendly_presenter] ||= Docks.current_language.friendly_presentation(parse_result)
          parse_result[:language] ||= extension
          parse_result[:file] ||= Docks.current_file
        end

        parsed_file
      end
    end
  end
end
