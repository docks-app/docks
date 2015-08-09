require_relative "base_tag.rb"

module Docks
  module Tags
    class Member < Base
      def initialize
        @name = :variation
        @parseable = false
        @multiple_allowed = true
      end

      def setup_post_processors
        after_each_pattern(:middle) do |pattern|
          last_object = nil
          script_symbols = pattern.script_symbols

          script_symbols.each do |symbol|
            is_member = symbol.member?
            for_symbol = symbol.for

            if for_symbol
              matching_symbol = script_symbols.find { |symbol| symbol.name == for_symbol }
            end

            last_object = symbol if last_object.nil? && !is_member
            next if last_object.nil? || (for_symbol && !matching_symbol)

            (matching_symbol || last_object).add_member(symbol) if is_member || for_symbol
            last_object = symbol if !is_member
          end

          pattern.script_symbols.delete_if(&:member?)
        end
      end
    end
  end
end
