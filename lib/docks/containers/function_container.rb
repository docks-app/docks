require_relative "symbol_container.rb"

module Docks
  module Containers
    # Public: a container for Function symbols.

    class Function < Symbol

      # Public: the type of symbols that should be encapsulated by this
      # container. This is compared against a symbol's `symbol_type` to
      # determine which container to use.
      #
      # Returns the type String.

      def self.type; Docks::Types::Symbol::FUNCTION end

      def static?; !!self[:static] end
      def instance?; !static? end
      def method?; !!self[:for] end

      def symbol_id
        return super unless method?
        "method-#{"static-" if static?}#{self[:for]}-#{self[:name]}"
      end
    end
  end
end
