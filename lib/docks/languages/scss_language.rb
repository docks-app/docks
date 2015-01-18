module Docks
  module Language
    class SCSS < Base
      @@type = Docks::Types::Languages::STYLE
      @@extensions = "scss"
      @@parser = Docks::Parsers::SCSS
    end
  end
end
