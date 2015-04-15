module Docks
  class Template
    @@templates = []
    @@fallback  = nil

    def self.fallback=(template)
      @@fallback = template
    end

    def self.default=(template)
      @@fallback = template
    end

    def self.fallback
      @@fallback ||= "pattern"
      @@fallback
    end

    def self.demo=(template)
      @@demo_template = template
    end

    def self.demo_template
      @@demo_template ||= "demo"
      @@demo_template
    end

    def self.register(template, options = {})
      if template.kind_of?(Hash)
        @@templates.concat template.map do |a_template, matcher|
          { template: a_template, matcher: matcher }
        end

      else
        @@templates << { template: template, matcher: options[:matches] || options[:for] }
      end
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
end
