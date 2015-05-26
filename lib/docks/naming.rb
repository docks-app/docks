module Docks
  module Naming
    PATTERN = /^([^:]*)::/
    INSTANCE_MEMBER = /#(.*)/
    STATIC_MEMBER = /\.(.*)/
    LOCAL_MEMBER = /~(.*)/

    def self.parse_descriptor(str)
      return str if str.kind_of?(Hash)

      result = {}

      str = str.sub(PATTERN) do
        result[:pattern] = Group.group_identifier($1).to_s
        ""
      end

      str = str.sub(INSTANCE_MEMBER) do
        result[:instance_member] = $1
        ""
      end

      str = str.sub(STATIC_MEMBER) do
        result[:static_member] = $1
        ""
      end

      str = str.sub(LOCAL_MEMBER) do
        result[:local_member] = $1
        ""
      end

      result[:symbol] = str
      result
    end
  end
end
