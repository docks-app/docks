module Docks
  module Language
    class ERB < Base
      @@type = Docks::Types::Languages::MARKUP
      @@extensions = "erb"
      @@parser = Docks::Parsers::ERB
    end
  end
end
