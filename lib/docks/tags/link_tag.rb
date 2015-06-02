module Docks
  module Tags

    # Public: The tag attributes for `@link`.
    #
    # This tag allows you to specify other resources relevant to the current
    # symbol.

    class Link < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@link` name for use in documentation, will allow only a single line
      # of documentation to be included in the tag, and will allow multiple
      # results to be included in a documentation block. This will also create
      # tags for `@links` and `@see`, which are synonymous with `@link`.

      def initialize
        @name = :link
        @synonyms = [:see]
        @multiline = false
        @type = Docks::Types::Tags::MULTIPLE_PER_BLOCK
      end

      def process(symbol)
        symbol.update(@name) do |links|
          Array(links).map { |link| OpenStruct.new name_and_parenthetical(link, :url, :caption) }
        end
      end
    end
  end
end
