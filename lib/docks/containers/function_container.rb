require File.expand_path("../base_container.rb", __FILE__)

module Docks
  module Containers

    # Public: a container for Function symbols.

    class Function < Base

      # Public: the type of symbols that should be encapsulated by this
      # container. This is compared against a symbol's `symbol_type` to
      # determine which container to use.
      #
      # Returns the type String.

      def self.type; Docks::Types::Symbol::FUNCTION end
    end
  end
end