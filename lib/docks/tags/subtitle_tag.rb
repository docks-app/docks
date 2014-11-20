# @subtitle
# The subtitle of the page, that's all!
#
# Synonymous with `@tagline`
#
# Only one allowed.

register :subtitle do
  one_per_file
  single_line
  synonyms :tagline
end
