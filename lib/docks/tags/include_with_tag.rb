# @include_with
# Another symbol with which this symbol should be included.
#
# Multiple allowed.

register :include_with do
  multiple_per_line

  process do |content|
    content = Docks::Processors::BreakApartOnCommasSpacesAndPipes.process(content)
  end
end
