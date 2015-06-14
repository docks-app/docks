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

      def summary
        summary = super
        summary.static = fetch(:static, nil)
        summary.property = fetch(:property, nil)
        summary
      end

      protected

      def matches_exactly?(descriptor)
        name = fetch(:name, nil)
        is_property = property?

        matches = (!is_property && super) ||
          (is_property && instance? && descriptor.instance_member == name) ||
          (is_property && static? && descriptor.static_member == name)

        matches && self
      end
    end
  end
end
