module Docks
  module Tags

    # Public: The tag attributes for `@author`.
    # This tag allows you to list a set of authors/ contributors on a given
    # symbol.

    class Author < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@author` name for use in documentation, will allow only a single line
      # of documentation to be included in the tag, and will allow multiple
      # results to be included on a single line. This will also create tags
      # for `@authors`, `@contributor`, and `@contributors`, which are
      # synonymous with `@author`.

      def initialize
        @name = :author
        @multiline = false
        @synonyms = [:authors, :contributor, :contributors]
        @type = Docks::Types::Tags::MULTIPLE_PER_LINE
      end

      def process(symbol)
        symbol.update(@name) do |authors|
          authors = Array(authors).map { |author| split_on_top_level_parens_commas_and_pipes(author) }.flatten
          authors.map { |author| OpenStruct.new name_and_parenthetical(author, :name, :email) }
        end
      end
    end
  end
end
