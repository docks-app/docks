require File.join(File.dirname(__FILE__), "base_container.rb")

module Docks
  module Containers
    class Mixin < Base
      def self.type; Docks::Types::Symbol::MIXIN end
    end
  end
end
