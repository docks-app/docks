module Docks
  module PostProcessors
    class AssociateExternalMarkupFiles < Base
      def self.post_process(parsed_file)
        markup_files = Group.source_files_of_type(Docks::Types::Languages::MARKUP)
        return parsed_file if markup_files.empty?

        parsed_file.each do |parse_result|
          next unless parse_result[:symbol_type] == Docks::Types::Symbol::COMPONENT
          next unless parse_result[:markup].nil?

          id = Group.group_identifier(parse_result[:name])
          markup_files.each do |file|
            if Group.group_identifier(file) == id
              parse_result[:markup] = File.read(file)
              break
            end
          end
        end
      end
    end
  end
end
