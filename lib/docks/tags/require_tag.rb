# @require
# Another symbol with which this symbol should be included.
#
# Synonymous with `@requires`
#
# Multiple allowed.

register :require do
  multiple_per_line
  synonyms :requires

  process do |content|
    content = Docks::Processors::BreakApartOnCommasSpacesAndPipes.process(content)
  end
end
