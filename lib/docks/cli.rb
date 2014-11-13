require 'optparse'

module Docks
  class CLI
    attr_reader :args

    def initialize(args)
      @args = args
    end

    def run
      return setup if args[0] == 'init'

      config = args[0].nil? ? 'docks_config.yml' : args[0]
      extra_args = []

      OptionParser.new do |opt|
        opt.on_tail('-v', '--version', 'Show the currently installed version of docks.') { puts "docks #{Docks::VERSION}"; exit }
        opt.on_tail('-h', '--help', 'Show this message again.') { puts opt; exit }
        opt.on('-c', '--config FILE', 'Path to the docks config file. The default is docks_config.yml.') { |config_file| config = config_file }
        opt.on('-s', '--silent', 'Run docks without printing to the console.') { Messenger.quiet }

        begin
          opt.parse! args
        rescue OptionParser::InvalidOption => e
          extra_args.push e.to_s.sub(/invalid option:\s+/, '')
        end
      end

      build config, extra_args
    end

    private

    def build(config, extra_args)
      builder = Build.new config
      Messenger.error(builder.errors.first) unless builder.is_valid?
      builder.build
    # rescue Errno::ENOENT
    #   Messenger.error "Could not load a 'docks_config.yml' file. Either add one or run 'docks init' to get started."
    end

    def setup
      Build.init
    rescue => e
      Messenger.error "#{e}"
    end
  end
end
