# @demo_type
# The type of demo that should be used for the current state
# or variant.
#
# Only one allowed.

register :demo_type do
  process do |content|
    content = Docks::Processors::JoinWithBlanks.process(content)
    Docks::Processors::EnsureValidDemoType.process(content)
  end
end
