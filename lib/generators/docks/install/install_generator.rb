require 'rails/generators/base'
require 'fileutils'

module Docks
  class InstallGenerator < Rails::Generators::Base
    source_root File.expand_path('../templates', __FILE__)
    desc 'Installs the Docks initializer into your application'

    class_option :partials, type: :boolean,
                 aliases: '-p',
                 default: true,
                 desc: 'Copy the default partials'

    class_option :extension, type: :string,
                 aliases: '-e',
                 default: 'erb',
                 desc: 'Specify an extension for the default partials (available: erb, haml, or slim)'

    def copy_partials
      copy_file 'application.html.erb', 'app/views/layouts/docks/application.html.erb'
      copy_file 'index.html.erb', 'app/views/docks/home/index.html.erb'
      copy_file 'pattern.html.erb', 'app/views/docks/home/pattern.html.erb'
      copy_file 'demo.html.erb', 'app/views/docks/home/demo.html.erb'
      FileUtils.cp_r File.expand_path('../../template/components', __FILE__), 'app/views/docks/shared/components'
    end

    def display_readme
      readme "POST_INSTALL" if behavior == :invoke
    end
  end
end
