module Docks
  class Builder
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

      FileUtils.cp_r Dir["#{TEMPLATE_DIR}/*"], Dir.pwd
      files = Dir["#{TEMPLATE_DIR}/*"]
      files_path = files.select { |file| file =~ /docks_config/ }
                        .first.split('/')[0...-1].join('/') + '/'
      Messenger.created Dir["#{TEMPLATE_DIR}/*"].map { |file| file.gsub(files_path, '') }
    end

    def is_valid?
      @errors.clear
      validate_src

      @errors.empty?
    end

    def self.build
      # return false unless is_valid?

      register_everything
      configure

      FileUtils.mkdir_p Docks.configuration.cache_dir

      Group.group(Docks.configuration.src_files).each do |group_identifier, group|
        next unless should_render_group?(group)

        parse_result = Parse.parse_group(group)
        next unless Pattern.is_valid?(parse_result)

        id = group_identifier.to_s
        add_to_group_cache(parse_result, id)
        cache(parse_result, id)
      end

      cache_groups

      Messenger.succeed("\nDocs successfully generated. Enjoy!")
      true
    end



    # Public: Determines whether or not the files within the passed group should
    # be rendered anew. This will be determined by whether or not the most recent
    # file modification date is older or newer than the associated cache file.
    #
    # group - An Array of Strings that are the paths to files in the group.
    #
    # Returns a Boolean indicating whether or not to render the group.

    def self.should_render_group?(group)
      cache_file = File.join(Docks.configuration.cache_dir, Group.group_identifier(group.first).to_s)
      return true unless File.exists?(cache_file)

      File.mtime(cache_file) < most_recent_modified_date(group)
    end



    private

    def self.add_to_group_cache(parse_result, id)
      @@group_cache[id] = Pattern.group_details(parse_result)
    end

    def self.cache_groups
      File.open(@@group_cache_file, "w") do |file|
        file.write(@@group_cache.to_yaml)
      end
    end

    def self.cache(parse_result, id)
      cache_file = File.join(Docks.configuration.cache_dir, id)

      File.open(cache_file, 'w') do |file|
        file.write(parse_result.to_yaml)
      end
    end

    def self.register_everything
      Tags.register_bundled_tags
      Process.register_bundled_post_processors

      Languages.register_bundled_languages
    end

    def self.configure
      Docks.pre_configuration
      if File.exists?(Docks.configuration.config_file)
        Docks.configure_with(YAML::load_file(Docks.configuration.config_file))
      end

      @@group_cache_file ||= File.join(Docks.configuration.cache_dir, Docks::GROUP_CACHE_FILE)
      @@group_cache ||= File.exists?(@@group_cache_file) ? YAML::load_file(@@group_cache_file) : {}
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

    def validate_src
      if @src_files.empty?
        @errors << 'No source files were specified in your config file.'
      end
    end

    def self.associate_markup_files_with_parse_results(parse_result, markup_files)
      (parse_result[Docks::Types::Languages::MARKUP] + parse_result[Docks::Types::Languages::STYLE]).each do |item|
        next if !(item.type == Types::Symbol::COMPONENT) || (item.respond_to?(:markup) && item.markup.length > 0)

        id = Group.group_identifier(item.name)
        markup_files.each do |file|
          if id == Group.group_identifier(file) && File.exists?(file)
            item.markup = File.read(file)
            break
          end
        end
      end
    end
  end
end
