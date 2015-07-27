require "singleton"

module Docks
  module SymbolSources
    class Base
      include Singleton

      def recognizes?(symbol, options = {}); false end
      def path_for(symbol); nil end
    end
  end
end
