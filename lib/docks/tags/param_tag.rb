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
        @synonyms = [:arg, :argument]
        @type = Docks::Types::Tag::MULTIPLE_PER_BLOCK
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
      # 3. The `default` value of the parameter. This can be included by
      # putting it a set of parentheses *after* the `name`.
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
      #   # => { name: "foo", types: ["String"] }
      #
      #   Docks::Tags::Param.process(["{String | Array} bar - A cool param."])
      #   # => { name: "bar", types: ["String", "Array"], description: "A cool param." }
      #
      #   Docks::Tags::Param.process(["{Object} baz ({}) - A multiline", "description."])
      #   # => { name: "baz", types: ["Object"], default: "{}", description: "A multiline description." }
      #
      # Returns a Hash representing the parsed param details.

      def process(content)
        Docks::Processors::PossibleMultilineDescription.process(content) do |first_line|
          match = first_line.match(/(?:\s*\{(?<type>[^\}]*)\})?\s*(?<name>[a-zA-Z\-_0-9\$]*)(?:\s*\((?<paren>[^\)]*)\))?(?:\s*\-?\s*(?<description>.*))?/)
          return nil if match.nil?

          description = match[:description]
          main_result = {
            name: match[:name],
            types: Docks::Processors::BreakApartTypes.process(match[:type]),
            description: description.nil? || description.length == 0 ? nil : match[:description]
          }

          paren_result = Docks::Processors::ParentheticalOptionsWithDefault.process(match[:paren], :default)
          if paren_result.kind_of?(Hash)
            main_result = paren_result.merge(main_result)
          else
            main_result[:default] = nil
          end

          main_result
        end
      end
    end
  end
end
