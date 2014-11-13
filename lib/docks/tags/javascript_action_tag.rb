# @javascript_action
# The action that should be taken when this state/ variant
# is toggled on/ off.
#
# Only one allowed.

register :javascript_action do
  process do |content|
    Docks::Processors::JoinWithBlanks.process(content)
  end
end
