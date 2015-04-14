module Docks
  class Template
    @@templates = []
    @@fallback  = nil

    def self.fallback=(template)
      @@fallback = template
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
      @@templates.reverse_each do |template_details|
        return template_details[:template] if template_details[:matcher] =~ id
      end

      @@fallback
    end
  end

  def self.template_for(id); Template.template_for(id) end
end
