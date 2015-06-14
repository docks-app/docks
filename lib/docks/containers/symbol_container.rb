require_relative "base_container.rb"

module Docks
  module Containers
    class Symbol < Base
      attr_accessor :belongs_to

      def self.type; "symbol" end

      def self.from_symbol(symbol)
        return if self == symbol.class
        new(symbol.to_h)
      end

      def initialize(symbol_hash = {})
        super

        self[:symbol_type] ||= self.class.type
      end

      def private?; fetch(:access, nil) == Docks::Types::Access::PRIVATE end
      def public?; !private? end

      def symbol_id
        "#{fetch(:symbol_type)}-#{fetch(:name)}"
      end
    end
  end
end
