require "docks"

RSpec.configure do |config|
  config.infer_base_class_for_anonymous_controllers = false
  config.order = "random"

  config.run_all_when_everything_filtered = true

  config.mock_with :rspec do |c|
    c.syntax = :expect
  end
end
