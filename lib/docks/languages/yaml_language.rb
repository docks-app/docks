module Docks
  module Languages
    class YAML < Base
      def self.type; Docks::Types::Languages::STUB end
      def self.extensions; "yml" end
      def self.stub_loader; lambda { |file| ::YAML::load_file(file) } end
    end
  end
end
