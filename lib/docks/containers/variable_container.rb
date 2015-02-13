require File.join(File.dirname(__FILE__), "base_container.rb")

module Docks
  module Containers
    class Variable < Base
      def self.type; Docks::Types::Symbol::VARIABLE end
    end
  end
end
