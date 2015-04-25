require_relative "base_container.rb"
require_relative "common_attributes/privacy.rb"

module Docks
  module Containers
    # Public: a container for Function symbols.

    class Function < Base
      include Common::Privacy

      # Public: the type of symbols that should be encapsulated by this
      # container. This is compared against a symbol's `symbol_type` to
      # determine which container to use.
      #
      # Returns the type String.

      def self.type; Docks::Types::Symbol::FUNCTION end

      def static?; !!@item[:static] end
      def instance?; !static? end
    end
  end
end
