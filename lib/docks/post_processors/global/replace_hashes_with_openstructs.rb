module Docks
  module PostProcessors
    class ReplaceHashesWithOpenStructs < Base

      KEYS_WITHOUT_OSTRUCT = [
        :stub,
        :value,
        :subcomponents
      ].freeze

      # Public: Processes the passed content by openstructifying all hashes,
      # including those within arrays or other hashes.
      #
      # parsed_file - The processed result of parsing the file.
      #
      # Examples
      #
      #   ReplaceHashesWithOpenStructs.process(:state, { name: 'tab--is-active', set_by: [{setter: ':active'}] })
      #   # => OpenStruct.new({ name: 'tab--is-active', set_by: [OpenStruct.new({setter: ':active'})] })
      #
      # Returns the parsed file value with all Hashes OpenStructified.

      def self.post_process(parsed_file)
        parsed_file.map! do |parse_result|
          parse_result.each do |key, value|
            next if KEYS_WITHOUT_OSTRUCT.include?(key)
            parse_result[key] = recursive_openstructify(value)
          end
        end

        parsed_file
      end



      private

      # Private: Recursively OpenStructifies `item`. If `item` is a Hash, this
      # will call the function on each of the function's values, then OpenStructify
      # the Hash itself. If `item` is an Array, this will map the Array's contents
      # by calling this function on them. Otherwise, the original value is used.
      #
      # item - the content to recursively OpenStructify.
      #
      # Examples
      #
      #   recursive_openstructify('foo')
      #   # => 'foo'
      #
      #   recursive_openstructify([{foo: 'bar', bar: 'baz'}, {baz: 'foo'}])
      #   # => [OpenStruct.new({foo: 'bar', bar: 'baz'}), OpenStruct.new({baz: 'foo'})]
      #
      #   recursive_openstructify({foo: 'bar', bar: {baz: 'foo'}})
      #   # => OpenStruct.new({foo: 'bar', bar: OpenStruct.new({baz: 'foo'})})
      #
      # Returns the OpenStructified content.

      def self.recursive_openstructify(item)
        if item.kind_of?(Hash)
          item.keys.each do |key|
            item[key] = recursive_openstructify(item[key]) unless KEYS_WITHOUT_OSTRUCT.include?(key)
          end
          CleanJSONOpenStruct.new(item)
        elsif item.kind_of?(Array)
          item.map! { |arr_item| recursive_openstructify(arr_item) }
        else
          item
        end
      end
    end

    private

    class CleanJSONOpenStruct < OpenStruct
      def as_json(options = nil)
        @table.as_json(options)
      end
    end
  end
end
