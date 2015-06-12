module Docks
  module Renderers
    module Common
      module Helperable
        def helpers(*helpers)
          load_helpers = Module.new

          helpers.each do |helper|
            if helper.kind_of?(Module)
              self.send(:extend, helper)
            elsif File.exists?(helper)
              load_helpers.module_eval(File.read(helper))
            end
          end

          load_helpers.constants.each do |constant|
            self.send(:extend, load_helpers.const_get(constant))
          end
        end
      end
    end
  end
end
