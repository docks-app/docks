module Docks
  class Template
    @@templates = []

    def self.register(template, options = {})
      if template.kind_of?(Hash)
        @@templates.concat template.map do |a_template, matcher|
          { template: a_template, matcher: matcher }
        end

      else
        @@templates << { template: template, matcher: options[:matches] || options[:for] }
      end
    end

    def self.template_for(file)
      id = Docks::Group.group_identifier(file)

      @@templates.reverse_each do |template_details|
        return template_details[:template] if template_details[:matcher] =~ id
      end

      nil
    end
  end

  def self.template_for(file); Template.template_for(file) end
end
