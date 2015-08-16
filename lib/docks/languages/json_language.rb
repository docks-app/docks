require_relative "base_language.rb"

module Docks
  module Languages
    class JSON < Base
      def self.type; Docks::Types::Languages::STUB end
      def self.extensions; %w(json) end

      def initialize
        require "json"
      end

      def load_stub(file)
        ::JSON::load(File.read(file).force_encoding("UTF-8"))
      end
    end
  end
end
