require_relative "symbol_container.rb"

module Docks
  module Containers

    # Public: a container for Variable symbols.

    class Variable < Symbol
      def self.type; Docks::Types::Symbol::VARIABLE end

      def static?; fetch(:static, false) end
      def instance?; !static? end
      def property?; fetch(:property, false) end

      def symbol_id
        return super unless property?
        "property-#{"static-" if static?}#{self[:for]}-#{self[:name]}"
      end

      def summary
        summary = super
        summary.static = static?
        summary.property = property?
        summary.for = fetch(:for, nil)
        summary
      end

      protected

      def matches_exactly?(descriptor)
        name = fetch(:name, nil)

        return super unless property?

        matches = (instance? && descriptor.instance_member == name) ||
          (static? && descriptor.static_member == name)

        matches && self
      end
    end
  end
end
