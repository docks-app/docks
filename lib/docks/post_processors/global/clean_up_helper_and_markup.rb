module Docks
  module PostProcessors
    class CleanUpHelperAndMarkup < Base
      def self.post_process(parsed_file)
        parsed_file.each do |parse_result|
          next unless parse_result[:symbol_type] == Docks::Types::Symbol::COMPONENT
          markup_present, helper_present = !parse_result[:markup].nil?, !parse_result[:helper].nil?

          if helper_present && !markup_present
            unless parse_result[:stub].nil?
              # TODO: THERE MUST BE A BETTER WAY
              puts functionize(parse_result[:helper], parse_result[:stub], "erb")
              parse_result[:helper] = functionize(parse_result[:helper], parse_result[:stub], "erb")
            end
          elsif markup_present && helper_present
            unless parse_result[:markup].index(parse_result[:helper]).nil?
              parse_result[:helper] = parse_result[:markup]
              parse_result[:markup] = nil
            end
          end

          parse_result[:stub] = nil
        end

        parsed_file
      end

      private

      def self.functionize(helper, stub, language)
        language = Docks::Language.language_for(language)
        (language.nil? || !language.respond_to?(:helper_markup_for)) ? nil : language.helper_markup_for(helper, stub)
      end
    end
  end
end
