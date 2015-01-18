module Docks
  module Language
    class Markdown < Base
      @@type = Docks::Types::Languages::DESCRIPTION
      @@extensions = ["md", "markdown"]
    end
  end
end
