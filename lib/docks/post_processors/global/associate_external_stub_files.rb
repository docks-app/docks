module Docks
  module PostProcessors
    class AssociateExternalStubFiles < Base
      def self.post_process(parsed_file)
        stub_files = Group.source_files_of_type(Docks::Types::Languages::STUB)
        return parsed_file if stub_files.empty?

        parsed_file.each do |parse_result|
          next unless parse_result[:symbol_type] == Docks::Types::Symbol::COMPONENT
          next unless parse_result[:stub].nil?

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
