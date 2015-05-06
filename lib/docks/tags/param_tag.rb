module Docks
  module Tags

    # Public: The tag attributes for `@param`.
    #
    # The `param` tag allows you to provide details around the types of
    # parameters expected for a given symbol.

    class Param < Base

      # Public: creates an instance of the tag. This will give the tag the
      # `@param` name for use in documentation, will allow multiple tags per
      # documentation block, will allow multiline documentation to be included
      # in the tag, and will create the `@arg` and `@argument` as synonyms for
      # `@param`.

      def initialize
        @name = :param
        @synonyms = [:arg, :argument, :parameter]
        @type = Docks::Types::Tags::MULTIPLE_PER_BLOCK

        @post_processors = [
          Docks::PostProcessors::JoinParamProperties
        ]
      end

      # Public: cleans up the param parsed from the documentation. There are
      # four components to a param:
      #
      # 1. The `name` of the parameter, which will usually be the name you
      # have given the variable in your code. This is the only mandatory piece
      # of the parameter.
      #
      # 2. The `types` of your parameter. These are indicated by including
      # them in curly braces *before* the parameter name. Multiple types are
      # allowed, and can be separated by commas, pipes, or spaces. As a result
      # of multiple being allowed, the `types` are always returned as an
      # array, even if only one is provided.
      #
      # 3. Whether or not the parameter is `optional`. This is indicated by
      # wrapping the name in square brackets. If there is a `default` value,
      # this can be indicated by putting it after the name, within the square
      # brackets, preceeded by an equal sign.
      #
      # 4. The `description`. This can be a single or multiline string,
      # starting on the line of the tag or the line after the tag, and
      # optionally separated from the rest of the tag with a hyphen. In a
      # post-processing step, this description will be parsed as Markdown.
      #
      # content - The parsed param as an Array of Strings, where each item in
      # the Array is one line from a single `@param` tag.
      #
      # Examples
      #   Docks::Tags::Param.process(["{String} foo"])
      #   # => { name: "foo", types: ["String"], optional: false }
      #
      #   Docks::Tags::Param.process(["{String | Array} bar - A cool param."])
      #   # => { name: "bar", types: ["String", "Array"], description: "A cool param.", optional: false }
      #
      #   Docks::Tags::Param.process(["{Object} [baz]"])
      #   # => { name: "baz", types: ["Object"], optional: true }
      #
      #   Docks::Tags::Param.process(["{Object} [baz = {}] - A multiline", "description."])
      #   # => { name: "baz", types: ["Object"], optional: true, default: "{}", description: "A multiline description." }
      #
      # Returns a Hash representing the parsed param details.

      def process(content)
        Docks::Processors::PossibleMultilineDescription.process(content) do |first_line|
          first_line = first_line.strip

          result = Hash.new

          if type_match = first_line.match(/^\{([^\}]*)\}\s*/)
            result[:types] = Docks::Processors::BreakApartTypes.process(type_match.captures.first)
            first_line = first_line.sub(type_match.to_s, "")
          else
            result[:types] = Array.new
          end

          name_match = first_line.match(/(?<optional>\[)?(?<name>[^\s=\]]*)[\s=\]]*/)
          result[:optional] = !name_match[:optional].nil?
          result[:name] = name_match[:name]
          first_line = first_line.sub(name_match.to_s, "")

          description_match = first_line.match(/\s*\-\s*(.*)/)
          result[:description] = description_match.nil? ? nil : description_match.captures.first
          first_line.sub!(description_match.to_s, "") unless description_match.nil?

          default_match = first_line.match(/(.*)\]\s*/)
          result[:default] = default_match.nil? ? nil : default_match.captures.first
          first_line = first_line.sub(default_match.to_s, "") unless default_match.nil?

          result[:description] = first_line if result[:description].nil? && !first_line.empty?

          result
        end
      end
    end
  end
end
