module Docks
  module Messenger
    @@quiet = false
    @@header = nil

    def self.quiet
      @@quiet = true
      self
    end

    def self.show
      @@quiet = false
      self
    end

    def self.puts(message); puts message end
    def self.warn(message); puts yellow("Warning: #{message}") end
    def self.error(message); puts red("Error: #{message}") end
    def self.succeed(message); puts green(message) end

    def self.created(*files)
      puts 'Created the following files and directories:'
      created_files files
    end

    def self.created_files(*files)
      files.flatten.each do |file|
        puts "  #{file}"
        if File.directory? file
          created_files Dir["#{file}/*"]
        end
      end
    end

    def self.file(file, action = :updated)
      unless @@header.nil?
        puts "\n#{@@header}"
        puts "-" * @@header.length
        @@header = nil
      end

      file = file.to_s.sub((Docks.config.root || Pathname.pwd).to_s, "").sub(/^\//, "")
      if action == :updated
        puts "Updated #{file}"
      elsif action == :created
        succeed "Created #{file}"
      end
    end

    def self.file_header(header)
      @@header = header
    end



    def self.puts(str)
      return if @@quiet
      super(str)
    end

    def self.colorize(color, str)
      "\e[#{color}m#{str}\e[0m"
    end

    def self.yellow(str); colorize(33, str) end
    def self.red(str); colorize(31, str) end
    def self.green(str); colorize(32, str) end
  end
end

