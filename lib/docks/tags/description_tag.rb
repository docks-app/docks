# @description
# The description for this symbol, that's it!

register :description do
  process do |content|
    Docks::Processors::JoinWithSmartLineBreaks.process(content)
  end
end
# TODO
