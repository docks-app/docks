require_relative "base_container.rb"

module Docks
  module Containers
    class Symbol < Base
      attr_accessor :belongs_to, :properties, :methods

      def self.type; "symbol" end

      def self.from_symbol(symbol)
        return if self == symbol.class
        new(symbol.to_h)
      end

      def initialize(symbol_hash = {})
        super
        self[:symbol_type] = self.class.type
        @properties = []
        @methods = []
      end

      def private?; fetch(:access, nil) == Docks::Types::Access::PRIVATE end
      def public?; !private? end

      def member?
        self[:property] == true || self[:method] == true
      end

      def members; @methods + @properties end

      def has_members?; !members.empty? end

      def add_member(symbol)
        symbol.for = fetch(:name)
        symbol.belongs_to = self
        symbol.static = true

        if symbol.kind_of?(Variable)
          symbol.property = true
          @properties << symbol
        else
          symbol.method = true
          @methods << symbol
        end
      end

      def add_members(*symbols)
        symbols.each { |symbol| add_member(symbol) }
      end

      def find(descriptor)
        descriptor = Descriptor.new(descriptor)
        return self if matches_exactly?(descriptor)

        members.find { |member| member.find(descriptor) } || false
      end

      def symbol_id
        "#{fetch(:symbol_type)}-#{fetch(:name)}"
      end

      def to_descriptor
        descriptor = ""
        descriptor << "#{belongs_to.name}::" unless belongs_to.nil?
        descriptor << fetch(:name)
        descriptor
      end

      def summary
        summary = super
        summary.properties = @properties.map(&:summary)
        summary.methods = @methods.map(&:summary)
        summary
      end
    end
  end
end
