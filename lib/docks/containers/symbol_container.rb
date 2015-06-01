require_relative "base_container.rb"

module Docks
  module Containers
    class Symbol < Base
      def self.type; "symbol" end

      attr_reader :symbol_type

      def initialize(symbol_hash = {})
        super

        @symbol_type = self[:symbol_type] = self.class.type
      end

      def private?; self[Docks::Tags::Access] == Docks::Types::Access::PRIVATE end
      def public?; !private? end

      def summary
        Summary.new(self)
      end

      protected

      class Summary < Base::Summary
        def initialize(symbol)
          super
          @symbol_type = symbol.symbol_type
        end

        def symbol_id
          "#{@symbol_type}-#{@name}"
        end

        def ==(other_summary)
          self.class == other_summary.class && symbol_id == other_summary.symbol_id
        end
      end
    end
  end
end
