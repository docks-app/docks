# @compatibility
# Name of the browser followed by an (optional) parenthesis containing the
# details (by default, details are interpreted as a version number).
#
# Synonymous with `@compatible_with`.
#
# Multiple allowed, one per line.

register :compatibility do
  multiple_per_line
  synonyms :compatible_with

  process do |content|
    Docks::Processors::NameAndParenthetical.process(content, :browser, :version)
  end
end
