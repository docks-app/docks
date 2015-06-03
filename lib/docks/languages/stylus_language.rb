require_relative "base_language.rb"
require_relative "../parsers/stylus_parser.rb"

module Docks
  module Languages
    class Stylus < Base
      def self.type; Docks::Types::Languages::STYLE end
      def self.extensions; %w(styl) end

      def signature_for(symbol)
        return unless [Types::Symbol::FUNCTION, Types::Symbol::MIXIN].include?(symbol.symbol_type)

        params = symbol.fetch(:params, []).map do |param|
          default = param.default
          param_string = param.name
          param_string << " = #{default}" if default
          param_string
        end

        "#{symbol.name}(#{params.join(", ")}) // ..."
      end

      def parser; Docks::Parsers::Stylus.instance end
    end
  end
end
