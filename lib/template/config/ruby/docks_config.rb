Docks.configure do |config|
  config.sources = [
    "styles/**/*.scss",
    "scripts/**/*.coffee"
  ]

  config.destination = "public"

  config.custom_templates do |templates|
    templates.default = "pattern.erb"
    templates.demo = "demo.erb"
  end

  config.asset_folders = {
    scripts:   "scripts",
    styles:    "styles",
    templates: "templates",
    images:    "images"
  }

  config.custom_tags do |tags|
  end

  config.custom_parsers do |parsers|
  end

  config.custom_languages do |languages|
  end

  config.include_assets = [
    "public/styles/style.css",
    "public/scripts/script.js"
  ]
end
