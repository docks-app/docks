Docks.configure do |config|
  # An array of glob patterns specifying all source files. These will be the
  # sources for all of your library's patterns. Include any style, script,
  # markup, stub, and description files you have to document your patterns.
  # These paths should be relative to the root of your project.
  config.sources = [
    "app/assets/stylesheets/**/*.{scss,css}",
    "app/assets/javascripts/**/*.{coffee,js}"
  ]

  # The root path of your pattern library. When generating a static version,
  # all pattern files will be nested inside this directory.
  config.mount_at = "pattern-library"

  # The name of the Github repo for this project. This can either be the URL or
  # in the form `<username>/<repo>`. The default theme uses this option, if
  # passed, to provide links to create issue and view source for your pattern
  # library's files.
  config.github_repo = ""

  config.custom_templates do |templates|
    templates.default = "pattern.html.erb"
    templates.demo = "demo.html.erb"
  end

  # Yields an object that allows you to register custom tags. Your
  # tag should extend `Docks::Tags::Base`. Once you have defined it, register
  # the custom tag as follows:
  #
  # config.custom_tags { |tags| tags << MyCustomTagClass }
  config.custom_tags do |tags|
  end

  # Yields an object that allows you to register custom languages. Your
  # language should extend `Docks::Languages::Base`. Once you have defined
  # it, register the custom language as follows:
  #
  # config.custom_languages { |languages| languages << MyCustomLanguageClass }
  config.custom_languages do |languages|
  end

  config.custom_parsers do |parsers|
  end

  config.custom_symbol_sources do |symbol_sources|
  end
end
