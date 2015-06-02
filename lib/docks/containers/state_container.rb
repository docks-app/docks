require_relative "variation_container.rb"

module Docks
  module Containers
    class State < Variation
      def self.type; Docks::Types::Symbol::STATE end
    end
  end
end
