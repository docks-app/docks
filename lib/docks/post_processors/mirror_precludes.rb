module Docks
  module PostProcessors
    class MirrorPrecludes < Base

      # Public: Post-processes the parsed file by mirroring any precludes from
      # a given state or variant to the other state or variant (so long as they
      # are both within the same component).
      #
      # parsed_file - The processed result of parsing the file.
      #
      # Examples
      #
      #   MirrorPrecludes.post_process [{ type: 'component', name: 'tab', states: [{ name: 'tab--is-active', precludes: ['tab--is-inactive'] }, { name: 'tab--is-inactive', precludes: [] }], variants: [] }]
      #   # => [{ type: 'component', name: 'tab', states: [{ name: 'tab--is-active', precludes: ['tab--is-inactive'] }, { name: 'tab--is-inactive', precludes: ['tab--is-active'] }], variants: [] }]
      #
      # Returns the parsed file with all preclusions mirrored.

      def self.post_process(parsed_file)
        parsed_file.each do |parse_result|
          next unless parse_result[:type] == Docks::Types::Symbol::COMPONENT

          states_and_variants = parse_result[:variants] + parse_result[:states]

          states_and_variants.each do |item|
            next if item[:precludes].empty?
            preclude_count = item[:precludes].count
            precludes_encountered = 0

            states_and_variants.each do |potential_match|
              next if item == potential_match
              next unless item[:precludes].include?(potential_match[:name])

              precludes_encountered += 1
              next if potential_match[:precludes].include?(item[:name])

              potential_match[:precludes].push(item[:name])

              break if preclude_count == precludes_encountered
            end
          end
        end

        parsed_file
      end
    end
  end
end
