require_relative "variation_tag.rb"

module Docks
  module Tags
    class State < Variation
      def initialize
        @name = :state
        @parseable = true
        @synonyms = [:states]
        @multiple_allowed = true
      end

      def process(symbol)
        symbol[@name].map! do |state|
          state = break_apart_variation_details(state)
          Containers::State.new(state)
        end
      end
    end
  end
end
