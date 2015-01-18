module Docks
  module Language
    class YAML < Base
      @@type = Docks::Types::Languages::STUB
      @@extensions = "yml"
      @@stub_loader = { |file| ::YAML::load_file(file) }
    end
  end
end
