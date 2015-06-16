module Docks
  class Descriptor
    PATTERN = /^([^:]*)::/
    INSTANCE_MEMBER = /#(.*)/
    STATIC_MEMBER = /\.(.*)/
    LOCAL_MEMBER = /~(.*)/
    MEMBERS = [:instance_member, :static_member, :local_member]

    attr_reader :pattern, :symbol
    attr_reader *MEMBERS

    def self.new(descriptor_string, options = {})
      descriptor_string.kind_of?(self) ? descriptor_string : super
    end

    def initialize(descriptor_string, options)
      parse(descriptor_string, options)
    end

    def member?
      MEMBERS.any? { |member_type| !self.send(member_type).nil? }
    end

    def member
      MEMBERS.each do |member_type|
        member = self.send(member_type)
        return member unless member.nil?
      end

      nil
    end

    private

    def parse(string, options)
      string = string.sub(PATTERN) do
        @pattern = Docks.pattern_id($1)
        ""
      end

      string = string.sub(INSTANCE_MEMBER) do
        @instance_member = $1
        ""
      end

      string = string.sub(STATIC_MEMBER) do
        @static_member = $1
        ""
      end

      string = string.sub(LOCAL_MEMBER) do
        @local_member = $1
        ""
      end

      @symbol = string
      @pattern, @symbol = @symbol, nil if options[:assume] == :pattern && @pattern.nil?
    end
  end
end
