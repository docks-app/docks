module Docks
  class Template
    @@templates = []
    @@fallback  = nil
    @@layout    = "application"

    def self.fallback=(template)
      @@fallback = template
    end

    def self.fallback
      @@fallback ||= "pattern"
      @@fallback
    end

    def self.default_layout
      @@layout
    end

    def self.default_layout=(layout)
      @@layout = layout
    end

    def self.default=(template)
      @@fallback = template
    end

    def self.demo=(template)
      @@demo_template = template
    end

    def self.demo_template
      @@demo_template ||= "demo"
      @@demo_template
    end

    def self.register(template, options = {})
      @@templates << {
        template: template,
        matcher: options[:matches] || options[:for]
      }
    end

    def self.template_for(id)
      return demo_template if id.to_sym == :demo

      @@templates.reverse_each do |template_details|
        return template_details[:template] if template_details[:matcher] =~ id
      end

      fallback
    end
  end

  def self.template_for(id); Template.template_for(id) end
  def self.current_template; @@current_template end
  def self.current_template=(template); @@current_template = template end
  def self.component_template_path; Pathname.new File.expand_path("../../template/assets/templates/components", __FILE__) end
end
