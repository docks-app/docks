module Docks
  module PostProcessors
    class AssociateExternalMarkupFiles < Base
      def self.post_process(parsed_file)
        stub_files = Docks.configuration.src_files[Docks::Types::Languages::STUB]
        return parsed_file if stub_files.empty?

        parsed_file.each do |parse_result|
          next unless parse_result[:type] == Docks::Types::Symbol::COMPONENT

          id = Group.group_identifier(parse_result[:name])
          stub_files.each do |file|
            if Group.group_identifier(file) == id
              parse_result[:stub] = Languages.load_stub_for(file)
              break
            end
          end
        end
      end
    end
  end
end
