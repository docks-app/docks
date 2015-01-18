module Docks
  module Language
    class Base
      def self.type; @@type end
      def self.parser; @@parser end
      def self.extensions; @@extensions end
      def self.stub_loader; @@stub_loader end
    end

    def self.bundled_languages
      @@bundled_languages ||= constants.select do |const|
        Class === const_get(const) && Class != Base
      end

      @@bundled_languages
    end
  end
end
