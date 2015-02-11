module Docks
  module Languages
    class Base
      include Singleton

      def self.type; nil end
      def self.parser; nil end
      def self.extensions; nil end

      def load_stub(file); nil end
      def friendly_presentation(symbol); symbol[:name] end
    end

    @@bundled_languages = nil

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
