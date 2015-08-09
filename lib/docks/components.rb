Dir[File.expand_path("../components/*.rb", __FILE__)].each do |component|
  require component
end

module Docks
  module Components
    COMPONENT_TEMPLATES_PATH = File.expand_path("../../../assets/source/components/", __FILE__)

    def self.component_for(name)
      const = name.to_s.split(/[^a-z]/i).map(&:capitalize).join("").to_sym
      const_defined?(const) ? const_get(const) : Base
    end

    def self.template_path(name)
      name = name.to_s.split(":")
      File.join(COMPONENT_TEMPLATES_PATH, name.first, "#{name.join("_")}.erb")
    end
  end
end
