# @access
# The access level of the method/ function.
#
# Only one allowed.

register :access do
  process do |content|
    content = Docks::Processors::JoinWithBlanks.process(content)
    access_types = Docks::Types::Access.constants.map { |const| Docks::Types::Access.const_get(const) }
    if access_types.include?(content)
      content
    else
      nil
    end
  end
end
