module Docks
  module PostProcessors
    class AssociateExternalDescriptionFiles < Base
      def self.post_process(parsed_file)
        description_files = Docks.configuration.files[Docks::Types::Languages::DESCRIPTION]
        return parsed_file if description_files.empty?

        parsed_file.each do |parse_result|
          next unless parse_result[:type] == Docks::Types::Symbol::COMPONENT
          next unless parse_result[:description].nil?

          id = Group.group_identifier(parse_result[:name])
          description_files.each do |file|
            if Group.group_identifier(file) == id
              parse_result[:description] = File.read(file)
              break
            end
          end
        end
      end
    end
  end
end