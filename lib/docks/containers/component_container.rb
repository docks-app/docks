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
        super || find_in_members(descriptor)
      end

      def summary
        summary = super

        [:states, :variants, :subcomponents].each do |property|
          summary[property] = fetch(property, []).map(&:summary)
        end

        summary
      end

      protected

      def recursive_subcomponents
        self[:subcomponents].inject([]) do |all_subcomponents, subcomponent|
          all_subcomponents << subcomponent
          all_subcomponents.concat(subcomponent.recursive_subcomponents)
        end
      end

      def find_in_members(descriptor)
        descriptor = Descriptor.new(descriptor)

        found = if !(descriptor.member? && descriptor.symbol != fetch(:name, nil))
          possible_variation_name = descriptor.member || descriptor.symbol
          variations.find { |variation| variation.find(descriptor) } || false
        else
          false
        end

        return found if found

        # Can't do a regular #find since each component searches its subcomponents
        subcomponents.each do |subcomponent|
          break if found = subcomponent.find(descriptor)
        end

        found
      end
    end
  end
end
