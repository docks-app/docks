module Docks
  module Messenger
    @@quiet = false

    def self.quiet
      @@quiet = true
      self
    end

    def self.show
      @@quiet = false
      self
    end

    def self.send(message); puts message end
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

