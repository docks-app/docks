Docks.configure do |config|
  config.src_files = [
    "styles/**/*.scss",
    "scripts/**/*.coffee"
  ]

  config.destination = "pattern_library"

  config.custom_templates do |template|
    template.fallback = "pattern_library_assets/templates/pattern.html.erb"
  end

  config.include_assets = [
    "public/styles/style.css",
    "public/scripts/script.js"
  ]
end
