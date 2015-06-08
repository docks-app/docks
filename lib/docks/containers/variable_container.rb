require_relative "symbol_container.rb"

module Docks
  module Containers

    # Public: a container for Variable symbols.

    class Variable < Symbol
      def self.type; Docks::Types::Symbol::VARIABLE end

      def static?; !!self[:static] end
      def instance?; !static? end
      def property?; !!self[:property] end

      def symbol_id
        return super unless property?
        "property-#{"static-" if static?}#{self[:for]}-#{self[:name]}"
      end
    end
  end
end
