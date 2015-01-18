module Docks
  module Language
    class CoffeeScript < Base
      @@type = Docks::Types::Languages::SCRIPT
      @@extensions = ["coffee", "coffeescript"]
      @@parser = Docks::Parsers::CoffeeScript
    end
  end
end
