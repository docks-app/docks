# @author
# Name of author followed by an (optional) parenthesis containing the their
# details (by default, details are interpreted as email addresses).
#
# Synonymous with `@authors`.
#
# Multiple allowed, one per line.

register :author do
  multiple_per_line
  synonyms :authors

  process do |content|
    Docks::Processors::NameAndParenthetical.process(content, :name, :email)
  end
end
