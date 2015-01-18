# CoffeeScript

register :coffeescript do
  extension 'coffee'
  parser Docks::Parsers::CoffeeScript
  type Docks::Types::Languages::SCRIPT
end



module Docks
  module Language
    class CoffeeScript < Base
      def initialize
        @type = Docks::Types::Languages::SCRIPT
        @extensions = ["coffee", "coffeescript"]
        @parser = Docks::Parsers::CoffeeScript

        register
      end
    end
  end
end
