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

      cache = Docks::Cache.new

      Group.group(Docks.configuration.src_files).each do |group_identifier, group|
        next unless should_build?(group)

        parse_result = Parser.parse_group(group)
        parse_result[:modified] = most_recent_modified_date(group).to_s
        cache << parse_result
      end

      cache.dump
      Messenger.succeed("\nDocs successfully generated. Enjoy!")
      true
    end


    private

    # Public: Determines whether or not the files within the passed group should
    # be rendered anew. This will be determined by whether or not the most recent
    # file modification date is older or newer than the associated cache file.
    #
    # group - An Array of Strings that are the paths to files in the group.
    #
    # Returns a Boolean indicating whether or not to render the group.

    def self.should_build?(group)
      cache_file = File.join(Docks.configuration.cache_dir, Group.group_identifier(group.first).to_s)
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

    def validate_src
      if @src_files.empty?
        @errors << 'No source files were specified in your config file.'
      end
    end
  end
end
