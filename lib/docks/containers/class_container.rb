require File.join(File.dirname(__FILE__), "base_container.rb")

module Docks
  module Containers
    class Klass < Base
      def self.type; Docks::Types::Symbol::CLASS end
    end
  end
end
