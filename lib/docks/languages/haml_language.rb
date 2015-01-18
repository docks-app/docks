module Docks
  module Language
    class Haml < Base
      @@type = Docks::Types::Languages::MARKUP
      @@extensions = "haml"
      @@parser = Docks::Parsers::Haml
    end
  end
end
