require_relative "base_symbol_source.rb"
require_relative "../languages.rb"

module Docks
  module SymbolSources
    class JQuery < Base
      def recognizes?(symbol, options = {})
        language = options.fetch(:language, nil)
        return false if language && Languages.file_type(language) != Types::Languages::SCRIPT

        symbol.downcase == "jquery"
      end

      def path_for(symbol); "http://api.jquery.com/" end
    end
  end
end
