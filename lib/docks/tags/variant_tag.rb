require_relative "variation_tag.rb"

module Docks
  module Tags
    class Variant < Variation
      def initialize
        @name = :variant
        @parseable = true
        @synonyms = [:modifier]
        @type = Docks::Types::Tags::MULTIPLE_PER_BLOCK
      end

      def process(symbol)
        symbol[@name].map! do |variant|
          variant = break_apart_variation_details(variant)
          Containers::Variant.new(variant)
        end
      end
    end
  end
end
