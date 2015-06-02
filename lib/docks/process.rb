module Docks
  class Process
    @@pattern_processors = { early: [], middle: [], late: [] }
    @@pattern_library_processors = { early: [], middle: [], late: [] }

    def self.process(item)
      case item
      when Containers::Symbol then process_symbol(item)
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
      symbol.tags.each do |tag|
        tag.process(symbol) if tag.respond_to?(:process)
      end
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
