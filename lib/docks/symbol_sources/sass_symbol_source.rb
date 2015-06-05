require_relative "base_symbol_source.rb"
require_relative "../languages.rb"
require_relative "../languages/sass_language.rb"

module Docks
  module SymbolSources
    class Sass < Base
      VALUE_SYMBOLS = %w(arglist bool color list map null number string)

      def recognizes?(symbol, options = {})
        language = options.fetch(:language, nil)
        return false if language && Languages.language_for(language) != Languages::Sass.instance

        symbol = symbol.downcase
        VALUE_SYMBOLS.include?(symbol) || symbol == "function"
      end

      def path_for(symbol)
        if symbol.downcase == "function"
          "http://sass-lang.com/documentation/Sass/Script/Script/Functions.html"
        else
          "http://sass-lang.com/documentation/Sass/Script/Value/#{symbol.capitalize}.html"
        end
      end
    end
  end
end
