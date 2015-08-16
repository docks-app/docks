require "docks"
require "awesome_print"
require "rspec-html-matchers"

Docks::Messenger.quiet

RSpec.configure do |config|
  config.include RSpecHtmlMatchers

  config.order = "random"

  config.mock_with :rspec do |c|
    c.syntax = :expect
  end

  current_dir = FileUtils.pwd

  config.around do |example|
    Docks::Tags.register_bundled_tags

    example.run

    FileUtils.cd(current_dir)

    # Forces any partially-run, multi-stage processing to finish
    Docks::Process.process(Docks::Containers::Pattern.new)
    Docks::Process.process(Docks::Containers::PatternLibrary.new)

    Docks.config.restore_defaults
    Docks::Languages.send(:clean)
    Docks::Tags.send(:clean)
    Docks::Process.send(:clean)
  end
end
