module Docks
  module PostProcessors
    class AssociateExternalMarkupFiles < Base
      def self.post_process(parsed_file)
        markup_files = Docks.configuration.src_files[Docks::Types::Languages::MARKUP]

        parsed_file.each do |parse_result|
          next unless parse_result[:type] == Docks::Types::Symbol::COMPONENT
          next unless parse_result[:markup].nil?

          id = Group.group_identifier(parse_result[:name])
          markup_files.each do |file|
            item[:markup] = File.read(file)
            break
          end
        end
      end
    end
  end
end
