require File.expand_path("../../types.rb", __FILE__)
require File.expand_path("../../tags.rb", __FILE__)

module Docks
  module Containers

    # Public: the base container for symbols. This class should be inherited
    # from for all other symbol containers. Its most important feature is that
    # it normalizes synonymous tags so that any tag can be called on a
    # container and the result will be returned as expected.

    class Base
      # Public: initializes a new container.

      def initialize(item)
        @item = item
      end

      # Public: dumps the details of this container to JSON.
      #
      # options - A Hash of options to forward to the JSON dump of the
      # encapsulated details Hash. Defaults to nil.
      #
      # Returns the JSON String of the details contained by this object.

      def to_json(options = nil)
        @item.to_json(options)
      end

      # Public: prints the contained details.
      # Returns a String.

      def to_s
        @item.to_s
      end

      # Public: prints the contained details.
      # Returns a String.

      def inspect
        to_s
      end

      def [](symbol)
        @item[symbol]
      end

      def []=(symbol, new_value)
        @item[symbol] = new_value
      end

      def each(&block)
        @item.each(&block)
      end

      # Public: forwards any missing methods to the encapsulated details.
      # Before doing so, the container will get the default tag name for the
      # missing method and use that to access the relevant item from the
      # details Hash. In this way, any synonymous tag will get the same value
      # from the contained details.
      #
      # meth - The missing method's name.
      #
      # Returns a String.

      def method_missing(meth)
        @item[Docks::Tags.base_tag_name(meth)] rescue nil
      end
    end



    # Public: all of the symbols that can appear on their own at the top level
    # of parse results. Some symbols are excluded from this list (like variants
    # and states) because these are always grouped under another top-level
    # symbol in a post-processing step.

    TOP_LEVEL_SYMBOLS = [
      Docks::Types::Symbol::COMPONENT,
      Docks::Types::Symbol::CLASS,
      Docks::Types::Symbol::FUNCTION,
      Docks::Types::Symbol::MIXIN,
      Docks::Types::Symbol::VARIABLE
    ]

    @@container_associations = {}

    # Public: gets the container that should be used to contain the passed
    # symbol. The association is based on the equality of the symbol's
    # `symbol_type` key and the container's `type` class variable. If no
    # matching containers are found, the Base container is used.
    #
    # symbol - a Hash representing a parsed symbol.
    #
    # Returns the container class to use to encapsulate this symbol.

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
