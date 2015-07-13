module Docks
  module Tags
    class Link < Base
      def initialize
        @name = :link
        @synonyms = [:see]
        @multiline = false
        @multiple_allowed = true
      end

      def process(symbol)
        symbol.update(@name) do |links|
          Array(links).map { |link| OpenStruct.new name_and_parenthetical(link, :url, :caption) }
        end
      end
    end
  end
end
