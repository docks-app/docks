module Docks
  class Process
    @@pattern_processors = { early: [], middle: [], late: [] }
    @@pattern_library_processors = { early: [], middle: [], late: [] }

    def self.process(item)
      case item
      when Containers::Symbol then item = process_symbol(item)
      when Containers::Pattern then process_pattern(item)
      when Containers::PatternLibrary then process_pattern_library(item)
      end

      item
    end

    def self.register_pattern_processor(hook = :middle, &block)
      @@pattern_processors[hook] << block unless @@pattern_processors[hook].include?(block)
    end

    def self.register_pattern_library_processor(hook = :middle, &block)
      @@pattern_library_processors[hook] << block unless @@pattern_library_processors[hook].include?(block)
    end

    private

    def self.clean
      @@pattern_processors = { early: [], middle: [], late: [] }
      @@pattern_library_processors = { early: [], middle: [], late: [] }
    end

    def self.process_symbol(symbol)
      # For when the initial symbol type was overwritten
      if symbol.symbol_type != symbol.class.type
        symbol = Containers.container_for(symbol.symbol_type).new(symbol.to_h)
      end

      # Allow tags to change the symbol's type
      tags = symbol.tags
      tags.each do |tag|
        next unless tag.respond_to?(:process)
        new_symbol = tag.process(symbol)
        symbol = new_symbol if new_symbol.kind_of?(Containers::Symbol)
      end

      symbol
    end

    def self.process_pattern(pattern)
      [:early, :middle, :late].each do |hook|
        @@pattern_processors[hook].each { |processor| processor.call(pattern) }
      end
    end

    def self.process_pattern_library(pattern_library)
      [:early, :middle, :late].each do |hook|
        @@pattern_library_processors[hook].each { |processor| processor.call(pattern_library) }
      end
    end
  end
end
