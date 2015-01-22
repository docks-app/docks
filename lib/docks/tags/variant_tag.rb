# @variants
# Processes the passed content by splitting it into name (pre-parenthesis),
# optional multiline description (post-parenthesis) and details (parenthesis).
# Details will be parsed with the default key being the demo_type. Other
# accepted attributes include :precludes, :set_by, :include_with, :activate_with,
# :javascript_action, and :active (each of which corresponds to the tag of the same name).
#
# Synonymous with `@modifier`, `@modifiers`, and `@variant`.
#
# Multiple allowed.

module Docks
  module Tags
    class Variant < Base
      def initialize
        @name = :variant
        @synonyms = [:variants, :modifier, :modifiers]
        @type = Docks::Types::Tag::MULTIPLE_PER_BLOCK

        @post_processors = [
          Docks::PostProcessors::JoinOrphanedVariantsAndStates,
          Docks::PostProcessors::CleanUpVariantsAndStates,
          Docks::PostProcessors::MirrorPrecludes
        ]
      end

      def process(content)
        Docks::Processors::BreakApartStatesAndVariants.process(content)
      end
    end
  end
end
