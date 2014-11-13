# @markup
# Single or multiline text, joined with newlines.
#
# Only one allowed.

register :markup do
  process do |content|
    Docks::Processors::JoinWithLineBreaks.process(content)
  end
end
