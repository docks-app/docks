module Docks
  module Processors
    class NameAndParenthetical < Base
      # Public:
      #
      # content     - A String or Array of Strings.
      # name_key    - An optional Symbol representing the key that should be
      #               used for the non-parenthetical portion. Defaults to :name.
      # default_key - An optional Symbol to be used as the default key for an
      #               unpaired item in the parentheses.
      #
      # Examples
      #
      #   NameAndParenthetical.process(':matches?', :setter)
      #   # => [{setter: ':matches?'}]
      #
      #   NameAndParenthetical.process(':size (SIZE::LARGE)', :setter, :constant)
      #   # => [{setter: ':size', constant: 'SIZE::LARGE'}]
      #
      #   NameAndParenthetical.process([':size (SIZE::LARGE)', ':checked?'], :setter, :constant)
      #   # => [{setter: ':size', constant: 'SIZE::LARGE'}, {setter: ':checked?'}]
      #
      # Returns an Array of hashes corresponding to the passed Strings. If a String
      # was initially passed, an array of one Hash will be returned.

      def self.process(content, name_key=:name, default_for_parenthetical=nil)
        content = Array(content)
        content.map do |line|
          result = {}
          match = line.match(/\s*(?<name>[^\(]*)(?:\s*\((?<paren>[^\)]*)\))?/)
          result[name_key] = match[:name].strip

          if (parenthetical = match[:paren]).nil?
            result
          else
            result.merge ParentheticalOptionsWithDefault.process(parenthetical, default_for_parenthetical)
          end
        end
      end
    end
  end
end
