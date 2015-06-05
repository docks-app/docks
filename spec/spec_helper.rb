require "docks"
require "awesome_print"
require "pry"
require "pry-debugger"
require "rspec-html-matchers"

Docks::Messenger.quiet

RSpec.configure do |config|
  config.include RSpecHtmlMatchers

  # config.infer_base_class_for_anonymous_controllers = false
  config.order = "random"

  # config.run_all_when_everything_filtered = true

  config.mock_with :rspec do |c|
    c.syntax = :expect
  end

  config.around do |example|
    Docks::Tags.register_bundled_tags

    example.run

    Docks.config.send(:reset)
    Docks::Languages.send(:clean)
    Docks::Tags.send(:clean)
    Docks::Process.send(:clean)
  end
end
