require "set"
require "tempfile"
require "mustache"

module Docks
  class Builder
    class Config < Mustache
      attr_reader :options

      def initialize(options)
        @options = options
      end

      def default_config; @default_config ||= Docks.config end

      def theme
        options.theme || default_config.theme.class.name.demodulize
      end
    end

    def self.make_config(options)
      template = Config.new(options)
      template.template = File.read(File.expand_path("../../../config/ruby/docks_config.rb", __FILE__))
      template.render
    end

    def self.parse(options = {})
      cache = Cache.new
      cache.clear if options.fetch(:clear_cache, false)

      Grouper.group(Docks.config.sources).each do |identifier, group|
        if Cache.cached?(group)
          cache.no_update(identifier)
        else
          cache << Parser.parse(group)
        end
      end

      cache.dump
    end

    def self.build
      prepare_destination
      Messenger.file_header("Assets:")
      copy_library_assets

      Messenger.file_header("Pages:")
      rendered_patterns = render_pattern_library
      remove_unused_directories(rendered_patterns)
    end

    def self.setup(options)
      @options = OpenStruct.new(options)
      @assets_dir = File.join(Dir.pwd, Docks::ASSETS_DIR)
      FileUtils.mkdir_p(@assets_dir)

      if Dir[CONFIG_FILE].empty?
        setup_config
      end

      Docks.configure

      return unless Docks.config.theme && Docks.config.theme.respond_to?(:setup)
      Docks.config.theme.setup(self)
    end

    def self.options; @options end
    def self.add_assets(type, assets); end

    private

    def self.prepare_destination
      FileUtils.mkdir_p(Docks.config.destination + Docks.config.mount_at)
    end

    def self.render_pattern_library
      pattern_library = Cache.pattern_library
      pattern_library.summarize! if Docks.config.paginate?
      rendered_patterns = Set.new

      if Docks.config.paginate?
        Grouper.group(Docks.config.sources).each do |id, _group|
          rendered_patterns << id if render(id, pattern_library)
        end
      else
        rendered_patterns << Docks.config.mount_at if render(nil, pattern_library)
      end

      rendered_patterns
    end

    def self.copy_library_assets
      return unless Docks.config.use_theme_assets

      Assets.styles.each do |style|
        destination = Docks.config.destination + Docks.config.asset_folders.styles + copied_name_for(style)
        copy_library_asset_file(style, destination)
      end

      Assets.scripts.each do |script|
        destination = Docks.config.destination + Docks.config.asset_folders.scripts + copied_name_for(script)
        copy_library_asset_file(script, destination)
      end
    end

    def self.copy_library_asset_file(file, destination)
      update = File.exist?(destination)
      return if update && FileUtils.identical?(file, destination)
      FileUtils.mkdir_p(File.dirname(destination)) unless update
      FileUtils.cp(file, destination.to_s)

      file = destination.to_s
                        .gsub(Docks.config.destination.dirname.to_s, "")
                        .sub(%r{^\/}, "")

      Messenger.file(file, update ? :updated : :created)
    end

    def self.copied_name_for(asset)
      File.basename(asset).sub(/pattern[\-_]library/, "docks")
    end

    def self.render(pattern, pattern_library)
      unless pattern.nil?
        return false unless Cache.pattern_for?(pattern)
        pattern = Cache.pattern_for(pattern)
      end

      locals = { pattern: pattern, pattern_library: pattern_library }

      template, layout, renderer = template_details(pattern)
      Helpers.add_helpers_to(renderer)
      renderer.ivars = locals
      Docks.current_renderer = renderer

      directory = Docks.config.destination + "#{Docks.config.mount_at}#{"/#{pattern.name}" unless pattern.nil?}"
      html_file = directory + "index.html"
      update = File.exist?(html_file)
      Docks.current_render_destination = html_file.dirname

      file = Tempfile.new(pattern.nil? ? "pattern_library" : pattern.name)

      begin
        file.write renderer.render template,
                                   layout: layout,
                                   locals: locals

        file.close
        unless update && FileUtils.identical?(html_file, file.path)
          FileUtils.mkdir_p(directory)
          FileUtils.cp_r(file.path, html_file)
          Messenger.file(html_file, update ? :updated : :created)
        end

        true
      ensure
        file.close
        file.unlink
      end
    end

    def self.template_details(pattern = nil)
      template = pattern.nil? ? Templates.fallback : Templates.template_for(pattern)
      layout = Templates.search_for_template(template.layout, must_be: :layout)
      template = Templates.search_for_template(template.path)
      renderer = Languages.language_for(template).renderer

      [template, layout, renderer]
    end

    def self.remove_unused_directories(rendered_patterns)
      Dir[Docks.config.destination + Docks.config.mount_at + "*/"].each do |pattern_dir|
        next if rendered_patterns.include?(File.basename(pattern_dir))
        deleted_file = Dir[File.join(pattern_dir, "*")].first
        FileUtils.rm_rf(pattern_dir)
        Messenger.file(deleted_file, :deleted)
      end
    end

    def self.setup_config
      config_folder = File.expand_path("../../../config", __FILE__)
      config_file = Dir[File.join(config_folder, options.config_type, "*")].first
      config_template = Config.new(options)
      config_template.template = File.read(config_file)
      target_file = File.basename(config_file)

      File.open(target_file, "w") { |file| file.write(config_template.render) }
      Messenger.file(target_file, :created)
    end

    def self.setup_styles(style_ext)
      styles_dir = File.join(@assets_dir, Docks.config.asset_folders.styles)
      FileUtils.mkdir_p(styles_dir)

      FileUtils.cp_r Dir[File.join(@template_dir, "styles", style_ext, "*")],
                     styles_dir
    end

    def self.setup_scripts(script_language)
      script_dir = File.join(@assets_dir, Docks.config.asset_folders.scripts)
      FileUtils.mkdir_p(script_dir)

      FileUtils.cp_r Dir[File.join(@template_dir, "scripts", script_language, "*")],
                     script_dir
    end

    def self.setup_templates(template_language)
      markup_dir = File.join(@assets_dir, Docks.config.asset_folders.templates)
      FileUtils.mkdir_p(markup_dir)
      FileUtils.cp_r Dir[File.join(@template_dir, "templates", template_language, "*")],
                     markup_dir
    end
  end

  def self.parse(options = {})
    Builder.parse(options)
  end

  def self.build
    Builder.build
  end
end
