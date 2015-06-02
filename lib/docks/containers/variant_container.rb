require_relative "variation_container.rb"

module Docks
  module Containers
    class Variant < Variation
      def self.type; Docks::Types::Symbol::VARIANT end
    end
  end
end
