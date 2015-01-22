module Docks
  module PostProcessors
    class AssociateExternalStubFiles < Base
      def self.post_process(parsed_file)
        return parsed_file if Docks.configuration.files.nil?
        stub_files = Docks.configuration.files[Docks::Types::Languages::STUB]
        return parsed_file if stub_files.empty?

        parsed_file.each do |parse_result|
          next unless parse_result[:type] == Docks::Types::Symbol::COMPONENT

          id = Docks::Group.group_identifier(parse_result[:name])
          stub_files.each do |file|
            if Docks::Group.group_identifier(file) == id
              parse_result[:stub] = Docks::Language.load_stub_for(file)
              break
            end
          end
        end
      end
    end
  end
end
