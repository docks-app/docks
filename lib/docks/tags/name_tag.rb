# @name
# The name of a block. This tag is technically not necessary —
# it will automatically be inferred by the first line following
# the block. The tag will, however, override the implicit name.
#
# Only one allowed.

register :name do
  process do |content|
    Docks::Processors::JoinWithBlanks.process(content)
  end
end
