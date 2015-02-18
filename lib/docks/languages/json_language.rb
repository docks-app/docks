require "json"

module Docks
  module Languages
    class JSON < Base
      def self.type; Docks::Types::Languages::STUB end
      def self.extensions; "json" end

      def load_stub(file)
        ::JSON::load(File.read(file))
      end
    end
  end
end
