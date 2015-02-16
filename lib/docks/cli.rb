require "optparse"

module Docks
  class CLI
    # TODO

    # attr_reader :args

    # def initialize(args)
    #   @args = args

    #   begin
    #     @options = opt_parser.parse!
    #   rescue OptionParser::InvalidOption => e
    #     abort(e.to_s)
    #   end
    # end

    # def opt_parser
    #   OptionParser.new do |parser|
    #     @parser = parser
    #     @parser.banner = 'Usage: docks [options] [files]'

    #     opts_for_output
    #     opts_for_utility
    #   end
    # end

    # def run
    #   return setup if args[0] == 'init'
    #   build
    # end

    # private

    # def opts_for_general
    #   opt :config, '-c', '--config FILE', 'Path to your docks config file. Default: docks_config.yml'
    # end

    # def opts_for_output
    #   separator('Output')

    #   @parser.on '-q', '-s', '--quiet', '--silent', 'Run docks without printing to the console.', proc { Docks::Messenger.quiet }
    # end

    # def opts_for_utility
    #   separator('Utility')

    #   @parser.on '-v', '--version', 'Show the currently installed version of docks.', proc { puts "docks #{Docks::VERSION}"; exit }
    #   @parser.on '-h', '--help', "What you're looking at RIGHT NOW.", proc { puts @parser; exit }
    # end

    # def opt(option, *args)
    #   @parser.on *args, proc { |value| @options[option] = value }
    # end

    # def separator(heading)
    #   @parser.separator("\n  ==== #{heading} ====\n\n")
    # end

    # def build
    #   # puts Docks.module_functions
    #   # Docks.configure do |config|
    #   #   # config.merge! @options
    #   # end

    #   builder = Builder.new("docks_config.yml")
    #   Messenger.error(builder.errors.first) unless builder.is_valid?
    #   builder.build
    # # rescue Errno::ENOENT
    # #   Messenger.error "Could not load a 'docks_config.yml' file. Either add one or run 'docks init' to get started."
    # end

    # def setup
    #   Builder.init
    # # rescue => e
    # #   Messenger.error "#{e}"
    # end

    # def abort(message = nil)
    #   Messenger.send(message) unless message.nil?
    #   exit(1)
    # end
  end
end
