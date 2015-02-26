module Docks
  module Languages
    module MarkupLanguage
      # TODO: empty arguments
      private

      def functionize_helper(helper_name, arguments, options = {})
        arguments = normalize_arguments(arguments)
        start_with = options[:start_with] || ""
        end_with = options[:end_with] || ""

        index = 0
        arguments_length = arguments.length

        function_string = arguments.inject("#{start_with}#{helper_name} ") do |func, argument|
          index += 1

          unless index == 1
            func << ", "
          end

          stringified = if index == arguments_length && argument.kind_of?(Hash)
            stringify_val(argument, join_with: ",\n#{" " * func.length}").sub(/\A[^\{]*\{ /, "").sub(/ \}[^\}]*\z/m, "")
          else
            stringify_val(argument)
          end

          func << stringified
          func
        end

        "#{function_string}#{end_with}"
      end

      def normalize_arguments(arguments)
        arguments.kind_of?(Array) ? arguments : [(arguments[:arguments] || arguments["arguments"] || [arguments])].flatten
      end

      def stringify_val(val, options = {})
        if val.kind_of?(String)
          "\"#{val}\""
        elsif val.kind_of?(Hash)
          options[:join_with] ||= ", "
          "{ #{val.map { |k, v| "#{(!k.kind_of?(String) && simple_symbol?(k)) ? "#{k}:" : "#{stringify_val(k)} =>"} #{stringify_val(v)}" }.join(options[:join_with])} }"
        elsif val.kind_of?(Array)
          options[:join_with] ||= ", "
          "[#{val.map { |v| stringify_val(v) }.join(options[:join_with])}]"
        elsif val.nil?
          "nil"
        elsif val.kind_of?(Symbol)
          val = val.to_s
          if simple_symbol?(val)
            ":#{val}"
          else
            ":\"#{val}\""
          end
        elsif val.kind_of?(Numeric)
          val.to_s.reverse.gsub(/(\d{3})(?=\d)/, '\\1_').reverse
        else
          val.to_s
        end
      end

      def simple_symbol?(symbol)
        symbol.to_s.split(" ").length == 1
      end
    end
  end
end
