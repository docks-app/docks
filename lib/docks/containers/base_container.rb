require_relative "../containers.rb"
require_relative "../tags.rb"
require_relative "../types.rb"

module Docks
  module Containers

    # Public: the base container for symbols. This class should be inherited
    # from for all other symbol containers. Its most important feature is that
    # it normalizes synonymous tags so that any tag can be called on a
    # container and the result will be returned as expected.

    class Base
      # Public: creates a summary of a symbol.

      def self.summarize(symbol_hash)
        Summary.new(symbol_hash)
      end

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

      # Public: returns the base details.

      def to_h
        @item
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


      # Public: a summary of a symbol, used for storing a lightweight cache
      # of the details of the entire pattern library.

      class Summary
        def initialize(symbol_hash)
          @details = {
            name: symbol_hash[:name],
            symbol_type: symbol_hash[:symbol_type]
          }
        end

        def method_missing(sym)
          @details[sym] || super
        end

        def symbol_id
          "#{@details[:symbol_type]}-#{@details[:name]}"
        end

        def to_yaml; @details.to_yaml end
        def to_json; @details.to_json end
      end
    end
  end
end
