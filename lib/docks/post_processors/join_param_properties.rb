module Docks
  module PostProcessors
    class JoinParamProperties
      PROP_MATCHER = /(?<base>\w+)(?:\.(?<name>\w+)|\[\s*['"](?<name>\w+))/

      def self.post_process(parsed_file)
        parsed_file.each do |parse_result|
          next unless params = parse_result[:param]

          final_params = []

          params.each do |param|
            if matches = param[:name].match(PROP_MATCHER)
              base_param_name, param[:name] = matches[:base], matches[:name]
              base_param = final_params.find { |final_param| final_param[:name] == base_param_name }

              if base_param.nil?
                base_param = {
                  name: base_param_name,
                  types: ["Object"],
                  properties: []
                }

                final_params << base_param
              else
                base_param[:properties] ||= []
              end

              base_param[:properties] << param
            else
              final_params << param
            end
          end

          parse_result[:param] = final_params
        end
      end
    end
  end
end
