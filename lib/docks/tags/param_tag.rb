# @param
# A parameter to the function. There are four components,
# with only the name of the param being required. The structure
# is the (optional) type(s), in curly braces, followed by the name,
# followed by the (optional) default value in parentheses, followed
# by the (optional) description, which can be optionally separated
# by a hyphen.
#
# Multiple allowed.

register :param do
  multiple_per_block
  synonyms :arg, :argument

  process do |content|
    content = Docks::Processors::PossibleMultilineDescription.process(content) do |first_line|
      match = first_line.match(/(?:\s*\{(?<type>[^\}]*)\})?\s*(?<name>[a-zA-Z\-_0-9]*)(?:\s*\((?<paren>[^\)]*)\))?(?:\s*\-?\s*(?<description>.*))?/)
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

    Docks::Processors::ReplaceHashWithOpenStruct.process(content)
  end
end
