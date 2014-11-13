# @title
# The title of a block (that is, the readable name), that's all!
#
# Only one allowed.

register :title do
  process do |content|
    Docks::Processors::JoinWithBlanks.process(content)
  end
end
