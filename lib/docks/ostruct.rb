require "ostruct"

module Docks
  class OpenStruct < ::OpenStruct
    def to_json(options = nil)
      @table.to_json(options)
    end

    def as_json(options = nil)
      @table.as_json(options)
    end

    def each(&block)
      @table.each(&block)
    end
  end
end
