module Docks
  module Languages
    class Less < Base
      def self.type; Docks::Types::Languages::STYLE end
      def self.parser; Docks::Parsers::Less end
      def self.extensions; "less" end

      def friendly_presentation(symbol)
        symbol_type, name = symbol[:symbol_type], symbol[:name]

        case symbol_type
          when Docks::Types::Symbol::VARIABLE then friendly_variable_presentation(name)
          when Docks::Types::Symbol::MIXIN
            directive = friendly_variable_presentation(name, ".")
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

      def friendly_variable_presentation(symbol, prefix = "@")
        "#{prefix unless symbol.start_with?(prefix)}#{symbol}"
      end
    end
  end
end
