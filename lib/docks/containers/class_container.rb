require_relative "base_container.rb"

module Docks
  module Containers

    # Public: a container for Class symbols.

    class Klass < Base

      # Public: the type of symbols that should be encapsulated by this
      # container. This is compared against a symbol's `symbol_type` to
      # determine which container to use.
      #
      # Returns the type String.

      def self.type; Docks::Types::Symbol::CLASS end

      def initialize(parse_result)
        super(parse_result)

        parse_result[:methods] ||= []
        parse_result[:methods].map! { |method| Containers.container_for(method).new(method) }
      end

      def methods; @item[:methods] end
      def public_methods; methods.select { |meth| meth.public? } end
      def private_methods; methods.select { |meth| meth.private? } end
      def static_methods; methods.select { |meth| meth.static? } end

      def public_properties; properties.select { |prop| prop.public? } end
      def private_properties; properties.select { |prop| prop.private? } end
      def static_properties; properties.select { |prop| prop.static? } end
    end
  end
end
