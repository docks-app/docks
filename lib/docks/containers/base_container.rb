module Docks
  module Containers
    class Base
      def initialize(item)
        @item = item
      end

      def to_json(options = nil)
        @item.to_json(options)
      end

      def to_s
        @item.to_s
      end

      def inspect
        to_s
      end

      def method_missing(meth)
        @item[Docks::Tag.default_tag_name(meth)] rescue nil
      end
    end

    TOP_LEVEL_SYMBOLS = [
      Docks::Types::Symbol::COMPONENT,
      Docks::Types::Symbol::CLASS,
      Docks::Types::Symbol::FUNCTION,
      Docks::Types::Symbol::MIXIN,
      Docks::Types::Symbol::VARIABLE
    ]

    @@container_associations = {}

    def self.container_for(symbol)
      if @@container_associations.empty?
        constants.each do |const|
          klass = const_get(const)
          @@container_associations[klass.type] = klass if klass.respond_to?(:type)
        end
      end

      @@container_associations[symbol[:symbol_type].to_s] || Base
    end
  end
end
