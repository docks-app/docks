module Docks
  module Languages
    class SCSS < Base
      def self.type; Docks::Types::Languages::STYLE end
      def self.parser; Docks::Parsers::SCSS end
      def self.extensions; ["scss", "sass"] end

      def friendly_presentation(symbol)
        symbol_type, name = symbol[:symbol_type], symbol[:name]

        case symbol_type
          when Docks::Types::Symbol::VARIABLE then friendly_variable_presentation(name)
          when Docks::Types::Symbol::PLACEHOLDER then friendly_variable_presentation(name, :placeholder)
          when Docks::Types::Symbol::MIXIN, Docks::Types::Symbol::FUNCTION
            directive = "@#{symbol_type == Docks::Types::Symbol::FUNCTION ? "function" : "mixin"} #{name}"
            params = (symbol[:param] || []).map do |param|
              name, default = param[:name], param[:default]
              param_string = friendly_variable_presentation(name)
              param_string << ": #{default}" if default
              param_string
            end

            "#{directive}(#{params.join(", ")}) { /* ... */ }"

          else name
        end
      end

      private

      def friendly_variable_presentation(symbol, type = :variable)
        prefix = type == :variable ? "$" : "%"
        "#{prefix unless symbol.start_with?(prefix)}#{symbol}"
      end
    end
  end
end
