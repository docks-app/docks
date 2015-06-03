require_relative "base_language.rb"

module Docks
  module Languages
    class YAML < Base
      def self.type; Docks::Types::Languages::STUB end
      def self.extensions; %w(yml yaml) end

      def initialize
        require "yaml"
      end

      def load_stub(file)
        ::YAML::load_file(file)
      end
    end
  end
end
