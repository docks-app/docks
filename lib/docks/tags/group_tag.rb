# @group
# The group to which this block should belong.
#
# Only one allowed.

register :group do
  process do |content|
    Docks::Processors::JoinWithBlanks.process(content)
  end
end
