require_relative "symbol_container.rb"

module Docks
  module Containers
    # Public: a container for Function symbols.

    class Function < Symbol
      def self.type; Docks::Types::Symbol::FUNCTION end

      def static?; fetch(:static, false) end
      def instance?; !static? end
      def method?; fetch(:method, false) end

      def symbol_id
        return super unless method?
        "method-#{"static-" if static?}#{self[:for]}-#{self[:name]}"
      end

      def summary
        summary = super
        summary.static = static?
        summary.method = method?
        summary.for = fetch(:for, nil)
        summary
      end

      protected

      def matches_exactly?(descriptor)
        name = fetch(:name, nil)
        is_method = method?

        matches = (!is_method && super) ||
          (is_method && instance? && descriptor.instance_member == name) ||
          (is_method && static? && descriptor.static_member == name)

        matches && self
      end
    end
  end
end
