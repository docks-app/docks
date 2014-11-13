# module Docks
#   module Finisher
#     class JoinVariantsAndStatesToModule
#       def self.finish(parsed_file)
#         main_module = nil
#         new_parse_results = []

#         parsed_file.each do |parse_result|
#           main_module = parse_result if parse_result[:type] == "module"

#           if %w(variant state).include? parse_result[:type]
#             new_item = parse_result.clone
#             type = new_item[:type].to_sym
#             base_class = Docks::Helpers.base_class(new_item[:name]) || main_module[:name]

#             if base_class == main_module[:name]
#               main_module[type] ||= []
#               main_module[type] << new_item
#             else
#               actual_module = parsed_file.select { |result| result[:name] == base_class }
#               unless actual_module.empty?
#                 actual_module.first[type] ||= []
#                 actual_module.first[type] << new_item
#               else
#                 new_module = {
#                   name: base_class,
#                   description: '',
#                   type: 'module',
#                   variant: [],
#                   state: []
#                 }
#                 new_module[type] << new_item
#                 new_parse_results << new_module
#               end
#             end
#           end
#         end

#         parsed_file.delete_if do |parse_result| %(variant state).include? parse_result[:type] end
#         parsed_file.concat new_parse_results
#       end
#     end

#     class CleanUpVariantsAndStates
#       def self.finish(parsed_file)
#         parsed_file.each do |parse_result|
#           next unless parse_result[:type] == 'module'

#           types = [:variant, :state]
#           default = {
#             demo_type: 'hidden',
#             active: 'false',
#             description: '',
#             activate_with: [],
#             precludes: [],
#             set_by: [],
#             include_with: [],
#             javascript_action: ''
#           }

#           types.each do |type|
#             parse_result[type] ||= []
#             parse_result[type].each do |item|
#               item[:base_class] = parse_result[:name]
#               item[:type] = type.to_s
#               item[:name] = clean_class_name(item[:name], item[:base_class])
#               item.merge!(default) { |k, passed, default| passed || default }
#               item[:activate_with].push(item[:base_class])

#               [:activate_with, :precludes, :include_with].each do |arr_attr|
#                 item[arr_attr].map! { |arr_attr_item| clean_class_name(arr_attr_item, item[:base_class]) }
#                 item[arr_attr].uniq!
#               end
#             end

#             parse_result[type].map! { |item| OpenStruct.new(item) }
#           end
#         end
#       end

#       def self.clean_class_name(name, base_class)
#         if name.start_with?('--')
#           "#{base_class}#{name}"
#         elsif name.start_with?('.')
#           name[1..-1]
#         else
#           name
#         end
#       end
#     end

#     class MirrorPrecludes
#       def self.finish(parsed_file)
#         parsed_file.each do |parse_result|
#           next unless parse_result[:type] == 'module'

#           all_items = parse_result[:variant] + parse_result[:state]

#           all_items.each do |item|
#             next if item.precludes.empty?

#             item.precludes.each do |preclude|
#               matches = all_items.select { |potential_match| potential_match.name == preclude }
#               matches.each do |match|
#                 match.precludes.push(item.name) unless match.precludes.include?(item.name)
#               end
#             end
#           end
#         end
#       end
#     end
#   end
# end
