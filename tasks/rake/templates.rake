require "html2haml"
require "html2slim"
require "fileutils"
require File.expand_path("../../../lib/docks/messenger.rb", __FILE__)

def from_root(file)
  file.sub(File.expand_path("../../", __FILE__), "").sub(/^#{File::SEPARATOR}/, "")
end

def erb_templates
  Dir[File.expand_path("../../../assets/templates/erb/**/*.erb", __FILE__)].sort
end

def corresponding_template(template, options = {})
  language = options.fetch(:language)
  template.sub("templates/erb", "templates/#{language}").sub(%r{\.erb$}, ".#{language}")
end

def convert_haml
  erb_templates.each do |template|
    haml_template = corresponding_template(template, language: :haml)
    FileUtils.mkdir_p(File.dirname(haml_template))
    `html2haml --ruby19-attributes '#{template}' '#{haml_template}'`

    Docks::Messenger.succeed "Converted '#{from_root(template)}' to '#{from_root(haml_template)}'"
  end
end

def convert_slim
  erb_templates.each do |template|
    slim_template = corresponding_template(template, language: :slim)
    FileUtils.mkdir_p(File.dirname(slim_template))
    File.open(slim_template, "w") { |file| file.write(HTML2Slim.convert!(template, :erb)) }

    Docks::Messenger.succeed "Converted '#{from_root(template)}' to '#{from_root(slim_template)}'"
  end
end

namespace :templates do
  desc "convert all ERB templates that are available to the user to other template languages"

  task :convert do
    convert_haml
    convert_slim

    puts ""
    Docks::Messenger.warn "Make sure to check the output of the above conversions to make sure that everything went OK!"
  end
end


