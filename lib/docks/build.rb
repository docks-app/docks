module Docks
  class Build
    attr_accessor :errors, :config_file, :src_files, :dest_dir, :src_groups

    def initialize(config_file)
      # Load the config file
      base_path = Pathname.new config_file
      Dir.chdir(base_path.dirname)
      config = YAML::load_file(base_path.basename)
      raise SyntaxError unless config.is_a? Hash

      FileUtils.mkdir(Docks::CACHE_DIR) unless File.exists?(Docks::CACHE_DIR)

      config['base_path'] ||= base_path
      @config = OpenStruct.new config
      @@config = @config

      @errors = []
      @config_file = config_file
      @src_files = Array(@config.src_files)
      @dest_dir = @config.dest_dir

    rescue SyntaxError
      raise SyntaxError, "Could not load the specified config file. Ensure that the file has the correct syntax or run 'docks init' to get started with a fresh configuration."
    end

    def self.init
      return Messenger.warn('You already have a docks_config.yml file. Please delete this and run this command again.') if File.exists?('docks_config.yml')

      FileUtils.cp_r Dir["#{TEMPLATE_DIR}/*"], Dir.pwd
      files = Dir["#{TEMPLATE_DIR}/*"]
      files_path = files.select { |file| file =~ /docks_config/ }
                        .first.split('/')[0...-1].join('/') + '/'
      Messenger.created Dir["#{TEMPLATE_DIR}/*"].map { |file| file.gsub files_path, '' }
    end

    def self.config
      @@config
    end

    def is_valid?
      @errors.clear
      validate_src
      validate_dest

      errors.empty?
    end

    def build
      # return false unless is_valid?
      # FileUtils.mkdir_p(@dest_dir) unless File.exists?(@dest_dir)
      # iframe_dir = File.join(@dest_dir, 'iframes')
      # FileUtils.mkdir_p(iframe_dir) unless File.exists?(iframe_dir)

      Docks::Tags.register_bundled_tags
      Docks::Languages.register_bundled_languages

      # @src_groups = grouper.group @src_files

      # rendered_files = []
      # needs_rendering = []
      # compare_files = Dir["#{@config.partials_dir}/**/*"].concat([@config.component_template, @config.component_iframe_template])
      # compare_modified_time = most_recent_modified_date(compare_files)

      # @src_groups.each do |src_group|
      #   if should_render_group?(src_group, compare_modified_time)
      #     cache_file = File.basename(src_group.first()).split('.').first
      #     cache_file = File.join(Docks::CACHE_DIR, cache_file)
      #     needs_rendering << cache_file

      #     File.open(cache_file, 'w') do |file|
      #       file.write parser.parse_group(src_group).to_yaml
      #     end
      #   end
      # end

      # components = Dir["#{Docks::CACHE_DIR}/*"].map { |e| File.basename(e) }

      # # Changes in the sidebar
      # if !File.exists?(Docks::CACHE_FILE) || YAML::load_file(Docks::CACHE_FILE) != components
      #   needs_rendering = components.map {|c| File.join(Docks::CACHE_DIR, c) }
      # end

      # needs_rendering.each do |cache_file|
      #   container.contain(YAML::load_file(cache_file))

      #   if container.is_valid? and !container.primary_modules.empty?
      #     rendered_files << renderer.render(container, components)
      #   end
      # end

      # File.open(Docks::CACHE_FILE, 'w') do |file|
      #   file.write components.to_yaml
      # end

      # if rendered_files.empty?
      #   Messenger.send 'No new files were needed and no existing docs pages needed updating.'
      # else
      #   Messenger.send 'Created/ updated the following docs pages:'
      #   Messenger.created_files rendered_files
      # end

      # Messenger.succeed "\nDocs successfully generated. Enjoy!"
      # true
    # rescue =>
    #   Messenger.error e
    end



    private

    def should_render_group?(src_group, compare_modified_time)
      return true if compare_modified_time.nil?
      outfile = File.join(@config.dest_dir, File.basename(src_group.first()).gsub(File.extname(src_group.first()), '.html'))
      return true unless File.exists?(outfile)

      edit_time = most_recent_modified_date(src_group)
      compare_modified_time > edit_time || edit_time > File.mtime(outfile)
    end

    def most_recent_modified_date(files)
      sorted_files = files.select { |file| File.exists?(file) }
      sorted_files.sort_by! { |file| File.mtime(file).to_i * -1 }
      return nil if sorted_files.first.nil?
      File.mtime(sorted_files.first)
    end

    def validate_src
      if @src_files.empty?
        @errors << 'No source files were specified in your config file.'
      end

      if Docks::Group.expand_src_files(@src_files).empty?
        @errors << 'Your source files pattern did not specify any files.'
      end
    end

    def validate_dest
      @errors << 'No destination directory was specified in your config file.' if @dest_dir.nil?
    end
  end
end
