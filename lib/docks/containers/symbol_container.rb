require_relative "base_container.rb"

module Docks
  module Containers
    class Symbol < Base
      def self.type; "symbol" end

      def initialize(symbol_hash = {})
        super

        self[:symbol_type] ||= self.class.type
      end

      def private?; fetch(:access, nil) == Docks::Types::Access::PRIVATE end
      def public?; !private? end

      def symbol_id
        "#{fetch(:symbol_type)}-#{fetch(:name)}"
      end

      def find(descriptor)
        descriptor = Naming.parse_descriptor(descriptor)
        descriptor[:symbol] == fetch(:name) ? self : nil
      end

      def summary
        Summary.new(self)
      end

      protected

      class Summary < Base::Summary
        attr_accessor :symbol_id

        def initialize(symbol)
          super
          @symbol_id = symbol.symbol_id
        end

        def ==(other_summary)
          self.class == other_summary.class && symbol_id == other_summary.symbol_id
        end

        def find(descriptor)
          descriptor = Naming.parse_descriptor(descriptor)
          descriptor[:symbol] == @name ? self : nil
        end
      end
    end
  end
end
