# @activate_with
# Symbols that should be used in conjunction with one another.
#
# Multiple allowed.

register :activate_with do
  multiple_per_line

  process do |content|
    content = Docks::Processors::BreakApartOnCommasSpacesAndPipes.process(content)
  end
end
