module Docks
  module Processors
    class ReplaceHashWithOpenStruct < Base
      # Public: Processes the passed content by switching Hashes
      # for OpenStructs — this includes both Hashes passed directly
      # to the processor and Arrays that contain Hahes.
      #
      # content - An Array or Hash representing the parsed result.
      #
      # Examples
      #
      #   ReplaceHashWithOpenStruct.process(foo: 'bar')
      #   # => OpenStruct.new(foo: 'bar')
      #
      #   ReplaceHashWithOpenStruct.process([{foo: 'bar'}, {baz: 'boo'}])
      #   # => [OpenStruct.new(foo: 'bar'), OpenStruct.new(baz: 'boo')]
      #
      # Returns the processed Array/ Hash.

      def self.process(content)
        if content.kind_of?(Hash)
          OpenStruct.new(content)
        elsif content.kind_of?(Array)
          content.map! { |item| item.kind_of?(Hash) ? OpenStruct.new(item) : item }
        else
          content
        end
      end
    end
  end
end
