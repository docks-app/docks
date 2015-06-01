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
        @type = Docks::Types::Tags::MULTIPLE_PER_LINE
      end

      def process(symbol)
        symbol.update(@name) do |set_bys|
          set_bys = Array(set_bys).map { |set_by| split_on_top_level_parens_commas_and_pipes(set_by) }.flatten
          set_bys.map { |set_by| OpenStruct.new name_and_parenthetical(set_by, :setter, :constant) }
        end
      end
    end
  end
end
