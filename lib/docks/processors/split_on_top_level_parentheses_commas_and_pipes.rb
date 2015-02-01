module Docks
  module Processors
    class SplitOnTopLevelParenthesesCommasAndPipes < Base
      def self.process(content)
        indexes = []
        depth = 0

        split_on = /[\|,]/
        content.chars.each_with_index do |char, index|
          if char == "("
            depth += 1
          elsif char == ")"
            new_depth = [0, depth - 1].max

            if new_depth == 0 && depth != 0
              indexes << index
            end

            depth = new_depth
          elsif split_on =~ char && depth == 0
            indexes << index
          end
        end


        result = []
        start_index = 0

        start_strip = /^\s*[,\|]*\s*/
        end_strip = /\s*[,\|]*\s*$/
        indexes.each do |index|
          if index > start_index
            item = content[start_index..index].gsub(start_strip, "").gsub(end_strip, "")
            result << item if item.length > 0
          end

          start_index = index + 1
        end

        if start_index < content.length
          result << content[start_index..-1].gsub(start_strip, "").gsub(end_strip, "")
        end

        result
      end
    end
  end
end
