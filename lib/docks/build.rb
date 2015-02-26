module Docks
  class Builder
    def self.build
      cache = Docks::Cache.new

      puts "SOURCE:"
      puts Docks.configuration.src_files

      puts "GROUPS:"
      puts Group.group(Docks.configuration.src_files)

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
  end
end
