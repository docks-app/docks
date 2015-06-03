require_relative "base_language.rb"

module Docks
  module Languages
    class HTML < Base
      def self.type; Docks::Types::Languages::MARKUP end
      def self.extensions; %w(html) end
    end
  end
end
