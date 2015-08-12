module Docks
  module Tags
    class Require < Base
      def initialize
        @name = :require
        @multiline = false
        @multiple_allowed = true

        @require_associations = {}
      end

      def process(symbol)
        symbol.update(@name) do |requires|
          Array(requires).map { |a_require| split_on_commas_spaces_and_pipes(a_require) }.flatten
        end

        if requires = symbol[@name]
          requires.each do |required|
            @require_associations[required] ||= []
            @require_associations[required] << symbol
          end
        end
      end

      def setup_post_processors
        after_all(:late) do |pattern_library|
          @require_associations.each do |descriptor, users|
            if result = pattern_library.find(descriptor)
              symbol = result.symbol || result.pattern
              symbol[UsedBy] = users.map { |user| user.to_descriptor }
            end
          end

          @require_associations = {}
        end
      end
    end

    class UsedBy < Base
      def initialize
        @name = :used_by
        @synonyms = [:required_by, :used_in]
        @parseable = false
      end
    end
  end
end
