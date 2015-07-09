module Docks
  module Tags
    class Author < Base
      def initialize
        @name = :author
        @synonyms = [:contributor]
        @multiple_allowed = true
        @multiline = false
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
