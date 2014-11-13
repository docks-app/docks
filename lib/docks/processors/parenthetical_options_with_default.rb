module Docks
  module Processors
    class ParentheticalOptionsWithDefault < Base
      # Public:
      #
      # content - A String of the parenthetical.
      # default - An optional Symbol representing the key that should be used if
      #           an un-paired value is provided.
      #
      # Examples
      #
      #   ParentheticalOptionsWithDefault.process('Activate with : foo , active : false')
      #   # => {activate_with: 'foo', active: 'false'}
      #
      #   ParentheticalOptionsWithDefault.process('select, active : false, javascript action: $(this).text(1 + 1)', :demo_type)
      #   # => {demo_type: 'select', active: 'false', javascript_action: '$(this).text(1 + 1)'}
      #
      # Returns the processed Hash.

      def self.process(content, default=nil)
        return content unless content.kind_of?(String)
        result, default_only = {}, true
        default = default.to_sym unless default.nil?
        # Strip leading and trailing parentheses
        content = content.strip.sub(/^\(/, '').sub(/\)$/, '')

        # Get a leading, un-keyed value. This will be set to the default
        # key (`default`), if it was passed
        content.sub!(/\s*([^,]*),?\s*/) do |match|
          if match.index(': ').nil?
            result[default] = $1.strip unless default.nil?
            ''
          else
            match
          end
        end

        # Cycle over key value pairs and add to the return Hash
        content.scan(/\s*(?<attribute>[^:]*):\s+(?<value>[^,]*),?\s*/).each do |match|
          default_only = false
          # Ensure that the key looks like a regular symbol
          result[match[0].strip.downcase.gsub(/\s+/, '_').to_sym] = match[1].strip
        end

        result
      end
    end
  end
end
