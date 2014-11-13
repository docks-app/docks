module Docks
  class Group
    def self.group(globs)
      files = self.expand_src_files(globs)

      grouped_files = []
      last_filename = nil

      files.each do |file|
        filename = File.basename(file).split('.').first.split('--').first.split('__').first.gsub('-helper', '')

        if last_filename.nil? or last_filename != filename
          grouped_files << [file]
          last_filename = filename
        else last_filename == filename
          grouped_files.last << file
        end
      end

      grouped_files
    end

    def self.expand_src_files(globs)
      files = []

      globs = Array(globs)

      globs.each do |glob|
        files << Dir.glob(glob)
      end

      files = files.flatten.uniq do |file|
        File.basename(file)
      end

      files.reject! do |file|
        !Docks::SUPPORTED_EXTENSIONS.include?(File.extname(file)[1..-1]) or file =~ /\.min\..*$/
      end

      files.sort_by! do |file|
        File.basename(file)
      end

      files
    end
  end
end
