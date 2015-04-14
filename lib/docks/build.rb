module Docks
  class Builder

    # Public: runs the parser on every group of files in the `src_files` of the
    # configuration. The results of the parse are augmented with a few small
    # details and are then cached.
    #
    # Returns nothing.

    def self.parse
      cache = Cache.new

      Group.group(Docks.config.src_files).each do |group_identifier, group|
        # this needs tests
        next unless should_parse?(group)

        parse_result = Parser.parse_group(group)
        parse_result[:modified] = most_recent_modified_date(group).to_s
        parse_result[:generated_by] = Docks::VERSION
        cache << parse_result
      end

      cache.dump
    end

    # Public: runs through every pattern group, pulls the associated item from
    # the cache, gets the correct template, and sends all of those (plus the
    # pattern groups representing the entire pattern library) to get rendered.
    # Additionally, this will copy any files in the library assets folder into
    # the specified destination folder.
    #
    # Returns nothing.

    def self.build
      destination = File.join(Docks.config.root, Docks.config.destination)
      FileUtils.mkdir_p(destination)
      FileUtils.cp_r Dir[File.join(Docks.config.root, "pattern_library_assets/*")], destination

      pattern_groups = Cache.pattern_groups
      Group.group(Docks.config.src_files).each do |id, group|
        begin
          pattern = Cache.pattern_for(id)
          template = Renderers.search_for_template(Template.template_for(id))
          renderer = Language.language_for(template).renderer

          File.open(File.join(Docks.config.root, Docks.config.destination, "#{id.to_s}.html"), "w") do |file|
            file.write renderer.render(template, pattern: pattern, pattern_groups: pattern_groups)
          end
        rescue Docks::NoPatternError => e
        end
      end
    end

    # Public: sets up all of the required directories and files in the
    # current directory.
    #
    # options - A hash of options determining what version of files to copy.
    #
    # Returns nothing.

    def self.setup(options)
      @@template_dir = File.expand_path("../../template", __FILE__)
      @@assets_dir = File.join(Dir.pwd, "pattern_library_assets")
      FileUtils.mkdir_p(@@assets_dir)

      setup_images
      setup_config(options[:config_type])
      setup_styles(options[:style_preprocessor])
      setup_scripts(options[:script_language])
      setup_templates(options[:template_language])
    end

    private

    # Public: copies all of the required images to the new directory.
    # Returns nothing.

    def self.setup_images
      FileUtils.cp_r(File.join(@@template_dir, "assets", "images"), @@assets_dir)
    end

    # Public: copies the relevant config file to the new directory.
    #
    # config_type - The directory in `lib/template/config` that contains the
    #               desired config file.
    #
    # Returns nothing.

    def self.setup_config(config_type)
      FileUtils.cp(Dir[File.join(@@template_dir, "config", config_type, "*")].first, Dir.pwd)
    end

    # Public: copies the required styles to the new directory.
    #
    # style_preprocessor - The directory in `lib/template/assets/styles` that
    #                      contains the desired stylesheets.
    #
    # Returns nothing.

    def self.setup_styles(style_preprocessor)
      styles_dir = File.join(@@assets_dir, "styles")
      FileUtils.mkdir_p(styles_dir)
      FileUtils.cp_r(Dir[File.join(@@template_dir, "assets", "styles", style_preprocessor, "*")], styles_dir)
    end

    # Public: copies the required scripts to the new directory.
    #
    # script_language - The directory in `lib/template/assets/scripts` that
    #                   contains the desired scripts.
    #
    # Returns nothing.

    def self.setup_scripts(script_language)
      script_dir = File.join(@@assets_dir, "scripts")
      FileUtils.mkdir_p(script_dir)
      FileUtils.cp_r(Dir[File.join(@@template_dir, "assets", "scripts", script_language, "*")], script_dir)
    end

    # Public: copies the required templates to the new directory.
    #
    # script_language - The directory in `lib/template/assets/templates` that
    #                   contains the desired templates.
    #
    # Returns nothing.

    def self.setup_templates(template_language)
      markup_dir = File.join(@@assets_dir, "templates")
      FileUtils.mkdir_p(markup_dir)
      FileUtils.cp_r(Dir[File.join(@@template_dir, "assets", "templates", template_language, "*")], markup_dir)
    end

    # Public: Determines whether or not the files within the passed group should
    # be rendered anew. This will be determined by whether or not the most recent
    # file modification date is older or newer than the associated cache file.
    #
    # group - An Array of Strings that are the paths to files in the group.
    #
    # Returns a Boolean indicating whether or not to render the group.

    def self.should_parse?(group)
      cache_file = File.join(Docks.config.cache_dir, Group.group_identifier(group.first).to_s)
      return true unless File.exists?(cache_file)

      File.mtime(cache_file) < most_recent_modified_date(group)
    end

    # Private: Figures out the newest file modification date of the passed file
    # paths.
    #
    # files - An Array of Strings that are the paths to files in the group.
    #
    # Returns the Time of the most recent modification date.

    def self.most_recent_modified_date(files)
      sorted_files = files.select { |file| File.exists?(file) }
      sorted_files.sort_by! { |file| File.mtime(file).to_i * -1 }
      return nil if sorted_files.empty?
      File.mtime(sorted_files.first)
    end
  end

  # See Docks::Builder.parse.

  def self.parse
    Builder.parse
  end

  # See Docks::Builder.build.

  def self.build
    Builder.build
  end
end
