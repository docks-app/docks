# @throws
# The type (or multiple types, comma-/space-/pipe-delimited) enclosed
# in curly braces, followed (optionally) by a single or multiline
# description (which can, optionally, be separated from the types with a hyphen).
#
# Synonymous with `@throw` and `@exception`.
#
# Multiple allowed.

register :throws do
  multiple_per_block
  synonyms :throw, :exception

  process do |content|
    content = Docks::Processors::PossibleMultilineDescription.process(content) do |first_line|
      match = first_line.match(/\s*\{(?<type>[^\}]*)\}(?:\s*\-?\s*(?<description>.*))?/)
      return nil if match.nil?

      description = match[:description]
      {
        types: Docks::Processors::BreakApartTypes.process(match[:type]),
        description: description.nil? || description.length == 0 ? nil : match[:description]
      }
    end

    Docks::Processors::ReplaceHashWithOpenStruct.process(content)
  end
end
