module Docks
  module Renderers
    module Common

      # Public: adds the required methods for adding helper files or modules
      # for use within templates rendered by a given renderer.

      module Helperable

        # Public: adds all of the helper modules in the passed arguments to the
        # including class.
        #
        # helper_files - An Array of paths to files that contain helper Modules
        #                or helper Modules directly. If paths are provided, the
        #                files will be `eval`ed and every Module contained
        #                inside will be included in the including class.
        #
        # Returns nothing.

        def helpers(*helper_files)
          load_helpers = Module.new

          helper_files.each do |helper_file|
            if helper_file.kind_of?(Module)
              self.class.send(:include, load_helpers.const_get(constant))
            else
              load_helpers.module_eval(File.read(helper_file))
            end
          end

          load_helpers.constants.each do |constant|
            self.class.send(:include, load_helpers.const_get(constant))
          end
        end
      end
    end
  end
end
