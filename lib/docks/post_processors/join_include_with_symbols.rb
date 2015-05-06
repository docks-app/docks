module Docks
  module PostProcessors
    class JoinIncludeWithSymbols < Base

      def self.post_process(parsed_file)
        @@parsed_file = parsed_file

        parsed_file.each do |parse_result|
          next unless parse_result[:symbol_type] == Docks::Types::Symbol::COMPONENT

          if include_withs = parse_result[:include_with]
            include_withs.each do |include_with|
              match = matching_component(include_with)
              next if match.nil?

              match[:included_symbols] ||= []
              match[:included_symbols] << parse_result
            end
          end

          (parse_result[:variant] + parse_result[:state]).each do |variation|
            if include_withs = variation.include_with
              include_withs.each do |include_with|
                match = matching_component(include_with)
                next if match.nil?

                match[:included_symbols] ||= []
                match[:included_symbols] << variation
              end
            end
          end
        end

        @@parsed_file = nil
        parsed_file
      end

      private

      def self.matching_component(name)
        @@parsed_file.select { |parse_result| parse_result[:name] == name }.first
      end
    end
  end
end
