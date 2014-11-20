# @since
# The version in which the current symbol was added. Optionally,
# a multiline description can be provided (first line must be separated
# by at least a space or a space and a hyphen).
#
# Synonymous with `@introduced_in`.
#
# Only one allowed.

register :since do
  synonyms :introduced_in

  process do |content|
    Docks::Processors::PossibleMultilineDescription.process(content) do |first_line|
      match = first_line.match(/\s*(?<version>[0-9a-zA\.\-_]*)(?:\s+\-?\s*(?<description>.*))?/)
      return nil if match.nil?

      description = match[:description]
      {
        version: match[:version],
        description: description.nil? || description.length == 0 ? nil : match[:description]
      }
    end
  end
end
