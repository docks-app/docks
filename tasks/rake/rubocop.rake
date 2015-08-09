require "rubocop/rake_task"

desc "Run RuboCop on the lib directory"

RuboCop::RakeTask.new(:rubocop) do |task|
  task.patterns = %w(lib/**/*.rb)
  task.fail_on_error = false
end
