module Docks
  module Templates
    class Template
      attr_reader :path, :layout

      def self.new(name, options = {})
        name.kind_of?(self) ? name : super
      end

      def initialize(name, options = {})
        @path = name
        @matcher = options[:matches] || options[:for]
        @layout = options[:layout]
      end

      def layout
        @layout || Templates.default_layout
      end

      def matches?(id)
        !(@matcher =~ id).nil?
      end
    end

    def self.demo; @demo_template end
    def self.demo=(template); @demo_template = Template.new(template, layout: "demo") end

    def self.default; @default_template end
    def self.fallback; default end
    def self.default=(template); @default_template = Template.new(template) end
    def self.fallback=(template); self.default = template end

    def self.default_layout; @default_layout end
    def self.default_layout=(layout); @default_layout = layout end

    def self.register(template, options = {})
      if template.kind_of?(Hash)
        register_from_hash(template)
      else
        @templates << Template.new(template, options)
      end
    end

    def self.<<(template)
      register(template)
    end

    def self.template_for(id)
      id = id.name if id.kind_of?(Containers::Pattern)

     @templates.reverse_each do |template|
        return template if template.matches?(id)
      end

      fallback
    end

    def self.search_for_template(template, options = {})
      return unless template.kind_of?(String) || template.kind_of?(Pathname)
      return template if File.exists?(template)

      if options[:must_be].nil?
        in_root = loose_search_for(template)
        return in_root unless in_root.nil?
      end

      in_specific = loose_search_for(File.join("#{(options[:must_be] || :partial).to_s.sub(/s$/, '')}{s,}", template))
      return in_specific unless in_specific.nil?

      raise Docks::NoTemplateError, "No #{options[:must_be] || "template"} matching '#{template}' was found. Make sure that you have a template by that name in the '#{options[:must_be].nil? ? Docks.config.asset_folders.templates : options[:must_be].to_s.pluralize}' folder of your pattern library's assets (or in a subdirectory of that folder), or provide a full path to the desired file."
    end

    def self.last_template_update
      @last_modified ||= begin
        templates = Dir[Docks.config.templates + "**/*.*"]
        templates.map { |template| File.mtime(template) }.sort.last
      end
    end

    private

    def self.register_from_hash(templates)
      if fallback = templates.delete("default") || templates.delete("fallback")
        self.fallback = fallback
      end

      if demo = templates.delete("demo")
        self.demo = demo
      end

      templates.each do |match, template|
        register(template, for: Regexp.new(match.to_s))
      end
    end

    def self.loose_search_for(path)
      return if path.nil?
      path = Docks.config.templates + path
      path_pieces = path.to_s.sub(File.extname(path), "").split("/")
      path_pieces[path_pieces.length - 1] = "{_,}#{path_pieces.last}"
      Dir.glob("#{path_pieces.join("/")}.*").first
    end

    def self.clean
      @demo_template = Template.new("demo", layout: (rails? ? "docks/demo" : "demo"))
      @default_template = Template.new("pattern")
      @default_layout = rails? ? "docks/pattern" : "pattern"
      @templates = []
    end

    def self.rails?
      defined?(Rails)
    end

    clean
  end

  def self.template_for(id); Templates.template_for(id) end
  def self.current_render_destination; @current_render_destination end
  def self.current_render_destination=(destination); @current_render_destination = destination end
  def self.component_template_path; Pathname.new(File.expand_path("../../template/assets/templates/components", __FILE__)) end
end
