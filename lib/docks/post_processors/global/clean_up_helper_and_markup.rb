module Docks
  module PostProcessors
    class CleanUpHelperAndMarkup < Base
      def self.post_process(parsed_file)
        parsed_file.each do |parse_result|
          next unless parse_result[:symbol_type] == Docks::Types::Symbol::COMPONENT
          markup_present, helper_present = !parse_result[:markup].nil?, !parse_result[:helper].nil?

          if helper_present && !markup_present
            unless parse_result[:stub].nil?
              parse_result[:helper] = functionize(parse_result[:helper], parse_result[:stub])
              parse_result[:stub] = nil
            end
          elsif markup_present && helper_present
            unless parse_result[:markup].index(parse_result[:helper]).nil?
              parse_result[:helper] = parse_result[:markup]
              parse_result[:markup] = nil
            end
          end
        end

        parsed_file
      end

      private

      def self.functionize(helper, stub)
        return helper if stub.keys.empty?
        arguments = stub[:arguments] || stub["arguments"]
        arguments = [stub] if arguments.nil?
        first = true

        function_sting = arguments.inject("<%= #{helper} ") do |func, arg|
          if first
            first = false
          else
            func << ", "
          end

          func << stringify_val(arg) if arg.kind_of?(String)
          func << arg.map { |k, v| "#{k}: #{stringify_val(v)}" }.join(",\n") if arg.kind_of?(Hash)

          func
        end

        "#{function_sting} %>"
      end

      def self.stringify_val(val)
        if val.kind_of?(String)
          "\"#{val}\""
        elsif val.kind_of?(Hash)
          "{ #{val.map { |k, v| "#{k}: #{stringify_val(v)}" }.join(",\n")} }"
        elsif !!val == val
          val
        elsif val.nil?
          "nil"
        else
          ":#{val}"
        end
      end
    end
  end
end
