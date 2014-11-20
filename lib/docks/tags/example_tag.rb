# @example
# A code example with optional language. If provided, the language must
# be on the first line of the tag. If not provided, the language will default
# to Docks::Languages::DEFAULT.
#
# Multiple allowed.

register :example do
  multiple_per_block

  process do |content|
    Docks::Processors::CodeBlockWithLanguage.process(content)
  end
end
