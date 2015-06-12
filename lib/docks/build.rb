require "set"

module Docks
  class Builder
    def self.parse(options = {})
      cache = Cache.new
      cache.clear if options.fetch(:clear_cache, false)

      Group.group(Docks.config.sources).each do |group_identifier, group|
        if Cache.cached?(group)
          cache.no_update(group_identifier)
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
      rendered_patterns = render_patterns
      remove_unused_directories(rendered_patterns)
    end

    def self.setup(options)
      @template_dir = File.expand_path("../../template", __FILE__)
      @assets_dir = File.join(Dir.pwd, Docks::ASSETS_DIR)
      FileUtils.mkdir_p(@assets_dir)

      setup_images
      setup_config(options[:config_type])
      setup_styles(options[:style_preprocessor])
      setup_scripts(options[:script_language])
      setup_templates(options[:template_language])
    end

    def self.prepare_destination
      FileUtils.mkdir_p(Docks.config.destination + Docks.config.mount_at)
    end

    def self.copy_library_assets
      library_assets_dir = Docks.config.library_assets
      Dir[library_assets_dir + "**/*.{css,html,js,svg,png,jpg,gif}"].each do |file|
        matching_destination = Docks.config.destination +
                               File.dirname(file)
                                   .gsub(library_assets_dir.to_s, "")
                                   .sub(%r{^\/}, "")

        FileUtils.mkdir_p(matching_destination)
        copy_library_asset_file(file, matching_destination)
      end
    end

    def self.copy_library_asset_file(file, destination)
      copied_file = destination + File.basename(file)
      update = File.exist?(copied_file)
      FileUtils.cp(file, destination)

      file = copied_file.to_s
                        .gsub(Docks.config.destination.dirname.to_s, "")
                        .sub(%r{^\/}, "")

      Messenger.file(file, update ? :updated : :created)
    end

    def self.render_patterns
      pattern_library = Cache.pattern_library
      rendered_patterns = Set.new

      Group.group(Docks.config.sources).each do |id, _group|
        rendered_patterns << id if render_pattern(id, pattern_library)
      end

      rendered_patterns
    end

    def self.render_pattern(pattern, pattern_library)
      return false unless Cache.pattern_for?(pattern)
      pattern = Cache.pattern_for(pattern)

      template, layout, renderer = template_details(pattern)
      Helpers.add_helpers_to(renderer)
      renderer.ivars = { pattern: pattern, pattern_library: pattern_library }

      directory = Docks.config.destination + "#{Docks.config.mount_at}/#{pattern.name}"
      html_file = directory + "index.html"
      update = File.exist?(html_file)
      Docks.current_render_destination = html_file.dirname
      FileUtils.mkdir_p(directory)

      File.open(html_file, "w") do |file|
        file.write renderer.render template: template,
                                   layout: layout,
                                   locals: { pattern: pattern, pattern_library: pattern_library }
      end

      Messenger.file(html_file, update ? :updated : :created)
      true
    end

    def self.template_details(pattern)
      template = Templates.template_for(pattern)
      layout = Templates.search_for_template(template.layout, must_be: :layout)
      template = Templates.search_for_template(template.path)
      renderer = Languages.language_for(template).renderer

      [template, layout, renderer]
    end

    def self.remove_unused_directories(rendered_patterns)
      Dir[Docks.config.destination + Docks.config.mount_at + "*"].each do |pattern_dir|
        next if rendered_patterns.include?(File.basename(pattern_dir).to_sym)
        deleted_file = Dir[File.join(pattern_dir, "*")].first
        FileUtils.rm_rf(pattern_dir)
        Messenger.file(deleted_file, :deleted)
      end
    end

    def self.setup_images
      images_dir = File.join(@assets_dir, Docks.config.asset_folders.images)
      FileUtils.mkdir_p(images_dir)
      FileUtils.cp_r(Dir[File.join(@template_dir, "assets/images/*")], images_dir)
    end

    def self.setup_config(config_type)
      FileUtils.cp(Dir[File.join(@template_dir, "config", config_type, "*")].first, Dir.pwd)
    end

    def self.setup_styles(style_ext)
      styles_dir = File.join(@assets_dir, Docks.config.asset_folders.styles)
      FileUtils.mkdir_p(styles_dir)

      FileUtils.cp_r(Dir[File.join(@template_dir, "assets/styles/*.css")], styles_dir)
      FileUtils.cp_r Dir[File.join(@template_dir, "assets/styles", style_ext, "*.#{style_ext}")],
                     styles_dir
    end

    def self.setup_scripts(script_language)
      script_dir = File.join(@assets_dir, Docks.config.asset_folders.scripts)
      FileUtils.mkdir_p(script_dir)

      FileUtils.cp_r(
        Dir[File.join(@template_dir, "assets/scripts", script_language, "*")],
        script_dir
      )

      FileUtils.cp_r(Dir[File.join(@template_dir, "assets/scripts/*.js")], script_dir)
    end

    def self.setup_templates(template_language)
      markup_dir = File.join(@assets_dir, Docks.config.asset_folders.templates)
      FileUtils.mkdir_p(markup_dir)
      FileUtils.cp_r Dir[File.join(@template_dir, "assets", "templates", template_language, "*")],
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
