module Docks
  module Tags
    class Param < Base
      def initialize
        @name = :param
        @synonyms = [:arg, :argument, :parameter]
        @multiple_allowed = true
      end

      def process(symbol)
        symbol.update(@name) do |params|
          params = Array(params).map do |param|
            param = multiline_description(param) { |first_line| proccess_first_line_of_param(first_line) }
            OpenStruct.new(param)
          end

          join_sub_params(params)
        end
      end

      private

      PROP_MATCHER = /(?<base>\w+)(?:\.(?<name>\w+)|\[\s*['"](?<name>\w+))/

      def proccess_first_line_of_param(first_line)
        first_line = first_line.strip
        result = Hash.new

        if type_match = first_line.match(/^\{([^\}]*)\}\s*/)
          result[:types] = split_types(type_match.captures.first)
          first_line = first_line.sub(type_match.to_s, "")
        else
          result[:types] = Array.new
        end

        name_match = first_line.match(/(?<optional>\[)?(?<name>[^\s=\]]*)[\s=\]]*/)
        result[:optional] = !name_match[:optional].nil?
        result[:name] = name_match[:name]
        first_line = first_line.sub(name_match.to_s, "")

        description_match = first_line.match(/\s*\-\s*(.*)/)
        result[:description] = description_match.nil? ? nil : description_match.captures.first
        first_line.sub!(description_match.to_s, "") unless description_match.nil?

        default_match = first_line.match(/(.*)\]\s*/)
        result[:default] = default_match.nil? ? nil : default_match.captures.first
        first_line = first_line.sub(default_match.to_s, "") unless default_match.nil?

        result[:description] = first_line if result[:description].nil? && !first_line.empty?

        result
      end

      def join_sub_params(params)
        final_params = []

        params.each do |param|
          param.properties ||= []

          if matches = param.name.match(PROP_MATCHER)
            base_param_name, param.name = matches[:base], matches[:name]
            base_param = final_params.find { |final_param| final_param.name == base_param_name }

            if base_param.nil?
              base_param = OpenStruct.new({
                name: base_param_name,
                types: ["Object"],
                properties: []
              })

              final_params << base_param
            end

            base_param.properties << param
          else
            final_params << param
          end
        end

        final_params
      end
    end
  end
end
