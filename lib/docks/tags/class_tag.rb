module Docks
  module Tags
    class Klass < Base
      def initialize
        @name = :class
        @multiline = false
      end

      def process(symbol)
        symbol.symbol_type = Types::Symbol::CLASS
        symbol[@name] = true
        Containers::Klass.from_symbol(symbol)
      end

      def setup_post_processors
        # Move classes/ properties to the preceeding class-like object
        after_each_pattern(:middle) do |pattern|
          last_classlike = nil

          pattern.script_symbols.each do |symbol|
            if [Containers::Klass, Containers::Factory].include?(symbol.class)
              last_classlike = symbol
              next
            end

            next if last_classlike.nil?
            last_classlike.add_member(symbol) if symbol[:method] || symbol[:property]
          end

          pattern.script_symbols.delete_if { |symbol| ![Containers::Klass, Containers::Factory].include?(symbol.class) && (symbol[:method] || symbol[:property]) }
        end
      end
    end
  end
end
