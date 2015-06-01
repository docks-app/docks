require_relative "base_tag.rb"

module Docks
  module Tags
    class Source < Base
      def initialize
        @name = :source
        @parseable = false
      end
    end
  end
end
