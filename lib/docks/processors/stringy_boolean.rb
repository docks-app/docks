module Docks
  module Processors
    class StringyBoolean < Base
      # Public: Processes the passed String by converting it to a
      # boolean where any string other than one matching /false/
      # will be considered true.
      #
      # content - A String representing the parsed result.
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
        return true if content.nil?
        return content unless content.kind_of?(String)
        !content.include?('false')
      end
    end
  end
end
