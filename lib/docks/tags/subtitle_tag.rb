# @subtitle
# The subtitle of the page, that's all!
#
# Synonymous with `@tagline`
#
# Only one allowed.

module Docks
  module Tags
    class Subtitle < Base
      def initialize
        @name = :subtitle
        @synonyms = [:tagline]
        @type = Docks::Types::Tag::ONE_PER_FILE
        @multiline = false
      end
    end
  end
end
