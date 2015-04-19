module Docks
  module Tags

    # Public: The tag attributes for `@state`.
    #
    # The `state` tag is one of the most important tags in documenting
    # components. It, along with the `variant` tag, allow you to document in
    # great detail the nature of presentation of variations on components.
    # While `state`s and `variant`s can be documented in their own
    # documentation blocks, it is often useful for smaller variations to
    # document them inline with the base component.

    class State < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@state` name for use in documentation, allows multiple lines of
      # documentation to be included in the tag, allows multiple tags to be
      # included per documentation block, and will create the `@states` tag as
      # a synonym for `@state`. It will also add a few post-processors that
      # make authoring easier.

      def initialize
        @name = :state
        @synonyms = [:states]
        @type = Docks::Types::Tags::MULTIPLE_PER_BLOCK

        @post_processors = [
          Docks::PostProcessors::JoinOrphanedVariantsAndStates,
          Docks::PostProcessors::CleanUpVariantsAndStates,
          Docks::PostProcessors::MirrorPrecludes
        ]
      end


      # Public: The `state` tag is composed of the following parts:
      #
      # 1. The `name`: typically, this will be the class name used for the
      # variation. Docks is smart enough to fill in missing parts of BEM-style
      # class names so, for instance, writing a name of `--is-active` inside a
      # documentation block for the `tab` component will, during a post-
      # processing step, be changed to `tab--is-active`. The `name` portion
      # should be immediately after the tag.
      #
      # 2. An optional parentheses filled with key-value pairs representing
      # the options for how this component should be presented in the pattern
      # library. If no key-value pairs are found, or if the first item is only
      # a value, it will be assumed to be the `demo_type` option. Other
      # options can be included as necessary, and they correspond to the
      # standalone tags documented elsewhere in this guide: you can details
      # for `active`, `activate_with`, `demo_type`, `include_with`,
      # `javascript_action`, `precludes`, and `set_by`.
      #
      #     For the options above that allow multiple results (`include_with`,
      #     `precludes`, `activate_with`, and `set_by`), additional ones can
      #     be included by separating them with spaces or pipes (but not with
      #     commas, since commas are used to delimit name-value pairs). For
      #     the underscored option names above, you can, if you prefer,
      #     replace the underscore with a space and Docks will transform it to
      #     the underscored version.
      #
      #     See the examples below for more examples of using these
      #     parentheticals.
      #
      # 3. An optional description. The description can be single- or multi-
      # line, starting on the line of the tag or the following line,
      # optionally separated by a hyphen from the rest of the first line.
      #
      # See `Docks::Processors::BreakApartStatesAndVariants` for examples.
      #
      # content - An array of lines included as the symbol's markup.
      #
      # Returns a Hash with the details for this state.

      def process(content)
        Docks::Processors::BreakApartStatesAndVariants.process(content)
      end
    end
  end
end
