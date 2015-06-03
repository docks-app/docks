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
