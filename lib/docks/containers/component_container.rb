require File.expand_path("../base_container.rb", __FILE__)

module Docks
  module Containers

    # Public: a container for Component symbols.

    class Component < Base

      # Public: the type of symbols that should be encapsulated by this
      # container. This is compared against a symbol's `symbol_type` to
      # determine which container to use.
      #
      # Returns the type String.

      def self.type; Docks::Types::Symbol::COMPONENT end

      # Public: whether or not this component requires a demo. A demo is assumed
      # necessary when there is markup, helper or standard, that was included
      # with the encapsulated component.
      #
      # Returns a Boolean.

      def has_demo?
        the_markup, the_helper = markup, helper
        (!the_markup.nil? && the_markup.length > 0) || (!the_helper.nil? && the_helper.length > 0)
      end

      # Public: collects all variations (states and variants) for this symbol.
      # Returns an Array of state/ variant symbols.

      def variations
        (states || []) + (variants || [])
      end
    end
  end
end
