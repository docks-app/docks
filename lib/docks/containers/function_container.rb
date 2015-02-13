require File.join(File.dirname(__FILE__), "base_container.rb")

module Docks
  module Containers
    class Function < Base
      def self.type; Docks::Types::Symbol::FUNCTION end
    end
  end
end
