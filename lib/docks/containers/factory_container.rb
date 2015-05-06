require_relative "class_container.rb"

module Docks
  module Containers

    # Public: a container for Factory symbols.

    class Factory < Klass

      # Public: the type of symbols that should be encapsulated by this
      # container. This is compared against a symbol's `symbol_type` to
      # determine which container to use.
      #
      # Returns the type String.

      def self.type; Docks::Types::Symbol::FACTORY end
    end
  end
end
