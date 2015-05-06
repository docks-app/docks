module Docks
  module PostProcessors
    class PrepareVariationMarkup < Base
      def self.post_process(parsed_file)
        parsed_file.each do |parse_result|
          next unless parse_result[:symbol_type] == Docks::Types::Symbol::COMPONENT
          markup, helper = parse_result[:markup], parse_result[:helper]

          (parse_result[:state] + parse_result[:variant]).each do |variation|
            next unless variation[:demo_type] == Docks::Types::Demo::OWN
            next if variation[:helper] || variation[:markup]

            if helper
              update_helper_for_variation(helper, variation)
            elsif markup
              update_markup_for_variation(markup, variation)
            end
          end
        end

        parsed_file
      end

      private

      def self.update_markup_for_variation(markup, variation)
        variation[:markup] = markup.gsub(/class\s*=\s*['"][^'"]*#{variation[:base_class]}[\s'"]/) do |match|
          "#{match[0...-1]} #{variation[:name]}#{match[-1]}"
        end
      end

      def self.update_helper_for_variation(helper, variation)
        (variation[:set_by] || []).each do |set_by|
          update_found = false
          new_helper = helper.gsub(/#{Regexp.escape(set_by[:setter].sub(/^:/, ""))}(:\s*|\s*=>\s*)([:a-zA-Z_]*)/) do |match|
            update_found = true
            value = set_by[:constant] || "true"
            join = $1.dup
            "#{set_by[:setter].sub(/^:/, "")}#{join}#{value}"
          end

          if update_found
            variation[:helper] = new_helper
            break
          end
        end
      end
    end
  end
end
