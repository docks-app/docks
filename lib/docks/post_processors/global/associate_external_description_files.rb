module Docks
  module PostProcessors
    class AssociateExternalDescriptionFiles < Base
      def self.post_process(parsed_file)
        current_pattern = Docks.current_pattern
        pattern_symbol = nil

        description_file = Group.source_files_of_type(Docks::Types::Languages::DESCRIPTION).find do |file|
          Group.group_identifier(file).to_s == current_pattern
        end

        return parsed_file if description_file.nil?
        description = File.read(description_file)

        pattern_symbol, other_symbols = parsed_file.partition { |symbol| symbol[:symbol_type] == Docks::Types::Symbol::PATTERN }
        pattern_symbol = pattern_symbol.first
        remaining_description = slice_up_description_for_symbols(description, other_symbols)

        if !pattern_symbol.nil? && pattern_symbol[:description].nil?
          pattern_symbol[:description] = remaining_description
        end
      end

      private

      def self.smart_description_association(symbol, description)
        case symbol[:symbol_type]
        when Docks::Types::Symbol::COMPONENT
          remaining_description = slice_up_description_for_symbols(description, (symbol[:states] || []) + (symbol[:variants] || []))
          symbol[:description] ||= remaining_description

        when Docks::Types::Symbol::CLASS, Docks::Types::Symbol::FACTORY
          remaining_description = slice_up_description_for_symbols(description, (symbol[:properties] || []) + (symbol[:methods] || []))
          symbol[:description] ||= remaining_description

        when Docks::Types::Symbol::FUNCTION
          remaining_description = slice_up_description_for_symbols(description, (symbol[:param] || []))
          symbol[:description] ||= remaining_description

        else
          symbol[:description] = description
        end
      end

      def self.slice_up_description_for_symbols(description, symbols)
        earliest_other_description_start = description.length

        symbols.each do |symbol|
          next unless symbol[:description].nil?

          regex = Regexp.new("^(?<heading>#+)\\s*#{Regexp.escape(symbol[:name])}\\s*$", Regexp::MULTILINE)
          if match = regex.match(description)
            next_matched_heading = Regexp.new("^#\{1,#{match[:heading].length}} [^#]", Regexp::MULTILINE).match(description, match.offset(:heading)[1])
            next_matched_heading_position = next_matched_heading.nil? ? description.length : next_matched_heading.offset(0)[0] - 1

            description_range = match.offset(0)[1]..next_matched_heading_position
            smart_description_association(symbol, description[description_range].strip)
            earliest_other_description_start = [earliest_other_description_start, description_range.first - match[0].length - 1].min
          end
        end

        description[0..earliest_other_description_start].strip
      end
    end
  end
end
