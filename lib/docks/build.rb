module Docks
  class Build
    def initialize(config_file)
      # Load the config file
      base_path = Pathname.new(config_file)
      Dir.chdir(base_path.dirname)
      config = YAML::load_file(base_path.basename)
      raise SyntaxError unless config.is_a? Hash

      FileUtils.mkdir(Docks::CACHE_DIR) unless Dir.exists?(Docks::CACHE_DIR)

      config['base_path'] ||= base_path
      @config = OpenStruct.new(config)

      @errors = []
      @src_files = Array(@config.src_files)

    rescue SyntaxError
      raise SyntaxError, "Could not load the specified config file. Ensure that the file has the correct syntax or run 'docks init' to get started with a fresh configuration."
    end

    def self.init
      return Messenger.warn('You already have a docks_config.yml file. Please delete this and run this command again.') if File.exists?('docks_config.yml')

      puts TEMPLATE_DIR
      FileUtils.cp_r Dir["#{TEMPLATE_DIR}/*"], Dir.pwd
      files = Dir["#{TEMPLATE_DIR}/*"]
      files_path = files.select { |file| file =~ /docks_config/ }
                        .first.split('/')[0...-1].join('/') + '/'
      Messenger.created Dir["#{TEMPLATE_DIR}/*"].map { |file| file.gsub(files_path, '') }
    end

    def self.config
      @@config
    end

    def is_valid?
      @errors.clear
      validate_src

      errors.empty?
    end

    def build
      return false unless is_valid?

      Tags.register_bundled_tags
      Process.register_bundled_post_processors
      Languages.register_bundled_languages

      Group.group(@src_files).each do |group|
        next unless should_render_group?(group)
        cache_file = File.join(Docks::CACHE_DIR, Group.group_identifier(group.first))

        File.open(cache_file, 'w') { file.write(Parse.parse_group(group).to_yaml) }
      end

      Messenger.succeed("\nDocs successfully generated. Enjoy!")
      true
    end



    private

    def should_render_group?(group)
      cache_file = File.join(CACHE_DIR, Group.group_identifier(group.first))
      return true unless File.exists?(cache_file)

      File.mtime(cache_file) < most_recent_modified_date(group)
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
    end
  end
end
