require_relative "symbol_container.rb"

module Docks
  module Containers

    # Public: a container for Component symbols.

    class Component < Symbol

      # Public: the type of symbols that should be encapsulated by this
      # container. This is compared against a symbol's `symbol_type` to
      # determine which container to use.
      #
      # Returns the type String.

      def self.type; Docks::Types::Symbol::COMPONENT end

      def initialize(component_hash = {})
        super

        self[:states] ||= []
        self[:variants] ||= []
        self[:subcomponents] ||= []
        self[:included_symbols] ||= []
      end

      def subcomponents(options = {}, &block)
        subcomponents = if options.fetch(:recursive, false)
          recursive_subcomponents
        else
          self[:subcomponents]
        end

        block_given? ? subcomponents.each(&block) : subcomponents
      end

      alias_method :subcomponent, :subcomponents

      def has_demo?
        !((markup || "") + (helper || "")).empty?
      end

      def variations(&block)
        variations = states + variants
        block_given? ? variations.each(&block) : variations
      end

      def find(descriptor)
        descriptor = Naming.parse_descriptor(descriptor)
        return self if descriptor[:symbol] == self[:name]
        recursive_subcomponents.find { |subcomponent| subcomponent.name == descriptor[:symbol] }
      end

      protected

      def recursive_subcomponents
        self[:subcomponents].inject([]) do |all_subcomponents, subcomponent|
          all_subcomponents << subcomponent
          all_subcomponents.concat(subcomponent.recursive_subcomponents)
        end
      end
    end
  end
end
