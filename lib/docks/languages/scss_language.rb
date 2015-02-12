module Docks
  module Languages
    class SCSS < Base
      def self.type; Docks::Types::Languages::STYLE end
      def self.parser; Docks::Parsers::SCSS end
      def self.extensions; ["scss", "sass"] end

      def friendly_presentation(symbol)
        symbol_type, name = symbol[:symbol_type], symbol[:name]

        case symbol_type
          when Docks::Types::Symbol::VARIABLE then "$#{name}"
          when Docks::Types::Symbol::PLACEHOLDER then "%#{name}"
          when Docks::Types::Symbol::MIXIN, Docks::Types::Symbol::FUNCTION
            directive = "@#{symbol_type == Docks::Types::Symbol::FUNCTION ? "function" : "mixin"} #{name}"
            params = (symbol[:param] || []).map do |param|
              name, default = param[:name], param[:default]
              param_string = "#{"$" unless name.start_with?("$")}#{name}"
              param_string << ": #{default}" if default
              param_string
            end

            "#{directive}(#{params.join(", ")}) { /* ... */ }"

          else name
        end
      end
    end
  end
end
