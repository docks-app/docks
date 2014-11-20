# @link
# Relevant URL, followed by an (optional) parenthesis containing
# a caption for the link.
#
# Synonymous with `@see` and `@links`.
#
# Multiple allowed, one per line.

register :link do
  multiple_per_block
  synonyms :see, :links

  process do |content|
    Docks::Processors::NameAndParenthetical.process(content, :url, :caption)
  end
end
