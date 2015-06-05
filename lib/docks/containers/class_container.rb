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

      def instance_members; instance_methods + instance_properties end
      def static_members; static_methods + static_properties end

      def find(descriptor)
        descriptor = Naming.parse_descriptor(descriptor)
        return unless descriptor[:symbol] == self[:name]
        instance_member, static_member = descriptor.values_at(:instance_member, :static_member)
        return unless descriptor[:local_member].nil?
        return self if instance_member.nil? && static_member.nil?

        if instance_member
          instance_members.find { |member| member.name == instance_member }
        else
          static_members.find { |member| member.name == static_member }
        end
      end

      def summary
        Summary.new(self)
      end

      protected

      class Summary < Symbol::Summary
        attr_accessor :instance_members, :static_members

        def initialize(klass)
          super
          @instance_members = klass.instance_members.map { |member| member.summary }
          @static_members = klass.static_members.map { |member| member.summary }
        end

        def find(descriptor)
          descriptor = Naming.parse_descriptor(descriptor)
          return unless descriptor[:symbol] == @name
          instance_member, static_member = descriptor.values_at(:instance_member, :static_member)
          return unless descriptor[:local_member].nil?
          return self if instance_member.nil? && static_member.nil?

          if instance_member
            instance_members.find { |member| member.name == instance_member }
          else
            static_members.find { |member| member.name == static_member }
          end
        end
      end
    end
  end
end
