# @alias
# Another name by which the symbol should be known.
#
# Multiple allowed.

register :alias do
  multiple_per_line

  process do |content|
    content = Docks::Processors::BreakApartOnCommasSpacesAndPipes.process(content)
  end
end
