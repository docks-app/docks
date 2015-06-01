require_relative "symbol_container.rb"

module Docks
  module Containers

    # Public: a container for Variable symbols.

    class Variable < Symbol
      # Public: the type of symbols that should be encapsulated by this
      # container. This is compared against a symbol's `symbol_type` to
      # determine which container to use.
      #
      # Returns the type String.

      def self.type; Docks::Types::Symbol::VARIABLE end

      def static?; !!@details[:static] end
      def instance?; !static? end
    end
  end
end
