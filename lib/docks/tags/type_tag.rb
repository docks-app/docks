# @type
# The type of a block. This tag is technically not necessary —
# it will automatically be determined by the result of calling
# ::parse_result_details on the parser.
#
# Only one allowed.

register :type do
  process do |content|
    Docks::Processors::JoinWithBlanks.process(content)
  end
end
