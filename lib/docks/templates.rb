module Docks
  module Templates
    class Template
      attr_reader :path, :layout

      def initialize(name, options = {})
        @path = name
        @matcher = options[:matches] || options[:for]
        @layout = options[:layout]
      end

      # Public: returns the layout for this template (or the default layout,
      # if no :layout key was provided in the constructor).

      def layout
        @layout.nil? ? Templates.default_layout : @layout
      end

      # Public: returns a boolean indicating whether or not this template should
      # be used for a group with the passed ID.
      #
      # id - The group ID to compare against this template.
      #
      # Returns a boolean.

      def matches?(id)
        !(@matcher =~ id).nil?
      end
    end


    # Public: accessors for demo_template (the template to use specifically for
    # demos), default_layout (the layout to use when none is specified for a
    # particular template), and fallback_template (aliased to default_template,
    # the template to use when none match the passed ID).

    def self.demo_template; @@demo_template end
    def self.default_layout; @@default_layout end
    def self.fallback_template; @@fallback_template end
    def self.default_template; fallback_template end

    def self.fallback_template=(template); @@fallback_template = Template.new(template) end
    def self.default_template=(template); self.fallback_template = template end
    def self.default_layout=(layout); @@default_layout = layout end

    def self.demo_template=(template); self.set_demo_template(template) end

    # An additional setter for @@demo_template — this one allows setting the
    # layout option for the template.
    #
    # template - The template path to use for demos.
    # options  - The options to use in constructing the template (most
    #            importantly, use the `layout` key to specify a layout).
    #
    # Returns nothing.

    def self.set_demo_template(template, options = {})
      options[:layout] ||= "demo"
      @@demo_template = Template.new(template, options)
    end


    # Registers a custom template.
    #
    # template - The template path.
    # options  - The options to use in constructing the template, including
    #            one of the `matches` or `for` keys (for the Regexp to use to
    #            identify when to use this template) and, optionally, a layout
    #            path to use for this template.
    #
    # Returns nothing.

    def self.register(template, options = {})
      @@templates << Template.new(template, options)
    end


    # Finds the Template instance for the passed ID.
    #
    # id - The id to compare against the `matches?` method for each template.
    #
    # Returns a Template object.

    def self.template_for(id)
      return demo_template if id.to_sym == :demo

      @@templates.reverse_each do |template|
        return template if template.matches?(id)
      end

      fallback_template
    end

    private

    def self.clean
      @@demo_template = Template.new("demo", layout: "demo")
      @@fallback_template = Template.new("pattern")
      @@default_layout = "application"
      @@templates = []
    end

    clean
  end

  def self.template_for(id); Templates.template_for(id) end
  def self.current_template; @@current_template end
  def self.current_template=(template); @@current_template = template end
  def self.component_template_path; Pathname.new(File.expand_path("../../template/assets/templates/components", __FILE__)) end
end
