module Docks
  module Renderers
    module StoreHelpers
      def helper_files=(helpers)
        @helpers = Module.new
        [helpers].flatten.each do |helper|
          @helpers.module_eval(File.read(helpers.first))
        end

        @helpers.constants.each do |constant|
          self.class.send(:include, @helpers.const_get(constant))
        end
      end
    end
  end
end
