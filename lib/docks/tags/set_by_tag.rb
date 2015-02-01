# @set_by
# Name of method or attribute by which the state/ variant is set,
# followed by an (optional) parenthesis containing the required
# constant or value required.

module Docks
  module Tags

    # Public: The tag attributes for `@set_by`.
    #
    # This tag is meant primarily for component variations, though it can be
    # useful elsewhere as well. It indicates some other symbol that causes
    # this variation to become active.
    #
    # The default theme will attempt to update helper code to represent what
    # would actually need to be passed to achieve the current demo component
    # state if one or more setters is added to the relevant variation.

    class SetBy < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@set_by` name for use in documentation, will allow only a single line
      # of documentation to be included in the tag, and will allow multiple
      # results to be included per line of documentation.

      def initialize
        @name = :set_by
        @multiline = false
        @type = Docks::Types::Tag::MULTIPLE_PER_LINE
      end


      # Public: Processes the parsed documentation into an Array of Hashes
      # representing the `set by`s' details. Regardless of whether you have
      # one or multiple `set by` declarations attached to a single tag, every
      # `set by` detail will be parsed such that the text before a set of
      # parentheses will be treated as the setting symbol's name (the
      # `setter`), and the contents of the parentheses will be treated as a
      # set of key-value pairs. If no such pairs are found (that is, there is
      # only a single value), the contents of the parentheses are assumed to
      # be the constant required for the `setter` to activate the symbol being
      # documented.
      #
      # See `Docks::Processors::SplitOnTopLevelParenthesesCommasAndPipes` and
      # `Docks::Processors::NameAndParenthetical` for examples.
      #
      # content - The line parsed from the documentation.
      #
      # Returns an Array of Hashes where each Hash represents a single
      # `set by`'s details.

      def process(content)
        content = Docks::Processors::SplitOnTopLevelParenthesesCommasAndPipes.process(content)
        Docks::Processors::NameAndParenthetical.process(content, :setter, :constant)
      end
    end
  end
end
