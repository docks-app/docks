module Docks
  module PostProcessors
    class AssociateExternalMarkupFiles < Base
      def self.post_process(parsed_file)
        return parsed_file if Docks.configuration.files.nil?
        markup_files = Docks.configuration.files[Docks::Types::Languages::MARKUP]
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
