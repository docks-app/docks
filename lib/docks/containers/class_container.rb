require_relative "symbol_container.rb"

module Docks
  module Containers

    # Public: a container for Class symbols.

    class Klass < Symbol
      # Public: the type of symbols that should be encapsulated by this
      # container. This is compared against a symbol's `symbol_type` to
      # determine which container to use.
      #
      # Returns the type String.

      def self.type; Docks::Types::Symbol::CLASS end

      def initialize(klass_hash = {})
        super

        self[:methods] ||= []
        self[:properties] ||= []
      end

      def methods; self[:methods] end
      def properties; self[:properties] end

      def public_methods; methods.select { |meth| meth.public? } end
      def private_methods; methods.select { |meth| meth.private? } end

      def static_methods; methods.select { |meth| meth.static? } end
      def instance_methods; methods.reject { |meth| meth.static? } end

      def public_properties; properties.select { |prop| prop.public? } end
      def private_properties; properties.select { |prop| prop.private? } end

      def static_properties; properties.select { |prop| prop.static? } end
      def instance_properties; properties.reject { |prop| prop.static? } end

      def members; instance_members + static_members end
      def instance_members; instance_methods + instance_properties end
      def static_members; static_methods + static_properties end

      def find(descriptor)
        descriptor = Descriptor.new(descriptor)

        return false unless descriptor.symbol == fetch(:name, nil)
        return self unless descriptor.member?

        members.find { |member| member.find(descriptor) } || false
      end

      def add_member(symbol)
        symbol.for = self[:name]
        symbol.belongs_to = self

        if symbol.kind_of?(Variable)
          symbol.property = true
          properties << symbol
        else
          symbol.method = true
          methods << symbol
        end
      end

      def add_members(*symbols)
        symbols.each { |symbol| add_member(symbol) }
      end

      def summary
        summary = super
        summary.properties = fetch(:properties, []).map(&:summary)
        summary.methods = fetch(:methods, []).map(&:summary)
        summary
      end
    end
  end
end
