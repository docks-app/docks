module Docks
  module Renderers
    module StoreHelpers

      def helper_files=(helpers)
        @helpers = Module.new
        [helpers].flatten.each do |helper|
          @helpers.module_eval(File.read(helpers.first))
        end
      end

      private

      def module_with_helper(helper)
        return if @helpers.nil?
        check_module_for_helper(@helpers, helper)
      end

      def check_module_for_helper(a_module, helper)
        if a_module.instance_methods.include?(helper)
          return a_module
        else
          a_module.constants.each do |constant|
            contained_constant_with_helper = check_module_for_helper(a_module.const_get(constant), helper)
            return contained_constant_with_helper unless contained_constant_with_helper.nil?
          end

          nil
        end
      end
    end
  end
end
