require File.join(File.dirname(__FILE__), "base_container.rb")

module Docks
  module Containers
    class Component < Base
      def self.type; Docks::Types::Symbol::COMPONENT end

      def has_demo?
        the_markup, the_helper = markup, helper
        (!the_markup.nil? && the_markup.length > 0) || (!the_helper.nil? && the_helper.length > 0)
      end

      def variations
        (states || []) + (variants || [])
      end
    end
  end
end
