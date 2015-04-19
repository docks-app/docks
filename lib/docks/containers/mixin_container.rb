require_relative "base_container.rb"
require_relative "common_attributes/privacy.rb"

module Docks
  module Containers

    # Public: a container for Mixin symbols.

    class Mixin < Base

      # Public: the type of symbols that should be encapsulated by this
      # container. This is compared against a symbol's `symbol_type` to
      # determine which container to use.
      #
      # Returns the type String.

      def self.type; Docks::Types::Symbol::MIXIN end
    end
  end
end
