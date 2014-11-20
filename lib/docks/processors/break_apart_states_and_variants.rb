module Docks
  module Processors
    class BreakApartStatesAndVariants
      # Public: Processes the passed content by splitting it into name (pre-parenthesis),
      # optional multiline description (post-parenthesis) and details (parenthesis).
      # Details will be parsed with the default key being the demo_type. Other
      # accepted attributes include :precludes, :set_by, :include_with, :activate_with,
      # :javascript_action, and :active (each of which corresponds to the tag of the same name).
      #
      # content - An Array of Strings where the first element is the name/ details line.
      #
      # Examples
      #
      #   BreakApartStatesAndVariants.process(['tab-list--is-active (select, active: true) - An active tablist!'])
      #   # => { name: 'tab-list--is-active', demo_type: 'select', active: true, description: 'An active tablist!' }
      #
      #   BreakApartStatesAndVariants.process(['tab-list--is-active (set by: TabList#activate, :active (State::ACTIVE))'])
      #   # => { name: 'tab-list--is-active', set_by: [ { setter: 'TabList#activate', constant: nil }, { setter: ':active', constant: 'State::ACTIVE' } ] }
      #
      # Returns a Hash with the parsed state/ variant.

      def self.process(content)
        PossibleMultilineDescription.process(content) do |item|

          match = item.match(/\s*\.?(?<class>[\$a-zA-Z\-\_]*)(?:\s*(?<details>\(.*\)))?(?:\s*\-?\s*(?<description>.*))?/m)
          return nil if match.nil?

          description = match[:description]
          result = {
            name: match[:class],
            description: description.nil? || description.length == 0 ? nil : match[:description],
            activate_with: [],
            precludes: [],
            set_by: [],
            include_with: [],
            demo_type: Docks::Types::Demo::NONE,
            javascript_action: nil,
            active: false
          }

          unless match[:details].nil?
            details = ParentheticalOptionsWithDefault.process(match[:details], :demo_type)
            result.merge!(details)

            result[:demo_type] = EnsureValidDemoType.process(result[:demo_type])
            result[:active] = StringyBoolean.process(result[:active])

            [
              :activate_with,
              :precludes,
              :include_with
            ].each do |array_param|
              result[array_param] = result[array_param].nil? ? [] : BreakApartOnCharacters.process(result[array_param], "\s\|")
            end

            result[:set_by] = NameAndParenthetical.process(BreakApartOnCharacters.process(result[:set_by], "\|"), :setter, :constant)
          end

          result
        end
      end
    end
  end
end
