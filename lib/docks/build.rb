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

    def build
      return false unless is_valid?

      Tags.register_bundled_tags
      Process.register_bundled_post_processors
      Languages.register_bundled_languages

      Group.group(@src_files).each do |group_identifier, group|
        next unless should_render_group?(group)
        cache_file = File.join(Docks.configuration.cache_dir, group_identifier.to_s)

        File.open(cache_file, 'w') { |file| file.write(Parse.parse_group(group).to_yaml) }
      end

      Messenger.succeed("\nDocs successfully generated. Enjoy!")
      true
    end

    def self.build
      group_of_files = [
        "#{::Rails::root}/app/assets/stylesheets/**/*.scss",
        "#{::Rails::root}/app/views/components/**/*.erb"
      ]

      # return false unless is_valid?

      Docks.configure do |config|
        config.cache_dir = defined?(::Rails) ? Rails.root.join("tmp", "docks_cache").to_s : '.docks_cache'
      end

      Tags.register_bundled_tags
      Process.register_bundled_post_processors
      Languages.register_bundled_languages

      FileUtils.mkdir_p Docks.configuration.cache_dir

      markup_files = Group.markup_files(group_of_files)
      puts markup_files

      Group.group(group_of_files).each do |group_identifier, group|
        next unless should_render_group?(group)
        parse_result = Parse.parse_group(group)
        next unless Pattern.is_valid?(parse_result)
        cache_file = File.join(Docks.configuration.cache_dir, group_identifier.to_s)

        File.open(cache_file, 'w') do |file|
          associate_markup_files_with_parse_results(parse_result, markup_files)
          file.write(parse_result.to_yaml)
        end
      end

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
        puts "id: #{Group.group_identifier(item.name)}"
        puts item.type
        puts (item.respond_to?(:markup) && item.markup.length > 0)
        next if !(item.type == Types::Symbol::COMPONENT) || (item.respond_to?(:markup) && item.markup.length > 0)

        group_id = Group.group_identifier(item.name)
        puts "id: #{group_id}"
        markup_files.each do |file|
          puts file
          if id == Group.group_identifier(file)
            item.markup = File.read(file)
            break
          end
        end
      end
    end
  end
end
