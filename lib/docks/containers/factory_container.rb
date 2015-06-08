require_relative "class_container.rb"

module Docks
  module Containers

    # Public: a container for Factory symbols.

    class Factory < Klass
      def self.type; Docks::Types::Symbol::FACTORY end
    end
  end
end
