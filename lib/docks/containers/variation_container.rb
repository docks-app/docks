require_relative "symbol_container.rb"

module Docks
  module Containers
    class Variation < Symbol
      def self.type; "variation" end

      def initialize(variation_hash = {})
        super
        set_defaults
      end

      def has_demo?
        [Types::Demo::OWN, Types::Demo::JOINT].include?(demo_type)
      end

      protected

      def set_defaults
        self[:active] = false if self[:active].nil?
        self[:demo_type] ||= Types::Demo::SELECT

        [:activate_with, :preclude, :set_by, :include_with].each do |defaults_to_array|
          value = self[defaults_to_array]
          self[defaults_to_array] = case value
            when NilClass then []
            when Array then value
            else [value]
          end
        end
      end
    end
  end
end
