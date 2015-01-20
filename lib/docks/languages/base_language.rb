module Docks
  module Languages
    @@bundled_languages = nil

    class Base
      def self.type; nil end
      def self.parser; nil end
      def self.extensions; nil end
      def self.stub_loader; nil end
    end

    def self.bundled_languages
      if @@bundled_languages.nil?
        bundled = constants.select do |const|
          klass = const_get(const)
          Class === klass && !(klass.eql?(Base))
        end

        @@bundled_languages = bundled.map { |const| const_get(const) }
      end

      @@bundled_languages
    end
  end
end
