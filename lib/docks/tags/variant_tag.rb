module Docks
  module Tags

    # Public: The tag attributes for `@variant`.
    #
    # The `state` tag is one of the most important tags in documenting
    # components. It, along with the `variant` tag, allow you to document in
    # great detail the nature of presentation of variations on components.
    # While `state`s and `variant`s can be documented in their own
    # documentation blocks, it is often useful for smaller variations to
    # document them inline with the base component.

    class Variant < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@variant` name for use in documentation, allows multiple lines of
      # documentation to be included in the tag, allows multiple tags to be
      # included per documentation block, and will create the `@variants`,
      # `@modifier`, and `@modifiers` tags as synonyms for `@variant`. It will
      # also add a few post-processors that make authoring easier.

      def initialize
        @name = :variant
        @synonyms = [:variants, :modifier, :modifiers]
        @type = Docks::Types::Tags::MULTIPLE_PER_BLOCK

        @post_processors = [
          Docks::PostProcessors::JoinOrphanedVariantsAndStates,
          Docks::PostProcessors::CleanUpVariantsAndStates,
          Docks::PostProcessors::MirrorPrecludes
        ]
      end


      # Public: parses a piece of variant documentation into a Hash
      # representing the details. From a parsing perspective, `variant` tags
      # are treated identically to `state`s, so all of the same options apply
      # — see the `state` tag for more details. The only difference will occur
      # in post-processing, where the two will be distinguised based on a
      # `type` property.
      #
      # See `Docks::Processors::BreakApartStatesAndVariants` for examples.
      #
      # content - An array of lines included as the symbol's markup.
      #
      # Returns a Hash with the details for this variant.

      def process(content)
        Docks::Processors::BreakApartStatesAndVariants.process(content)
      end
    end
  end
end
