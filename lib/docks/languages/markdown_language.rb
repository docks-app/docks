require_relative "base_language.rb"

module Docks
  module Languages
    class Markdown < Base
      def self.type; Docks::Types::Languages::DESCRIPTION end
      def self.extensions; ["md", "markdown"] end
    end
  end
end
