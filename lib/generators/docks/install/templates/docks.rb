Docks.configure do |config|
  config.github_repo = "https://github.com/lemonmade/docks"

  config.sources = %w(
    app/assets/stylesheets/**/*.scss
    app/assets/javascripts/**/*.coffee
  )

  config.custom_parsers do |parsers|
  end

  config.custom_templates do |templates|
  end
end
