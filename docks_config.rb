Docks.configure do |config|
  config.sources = [
    "assets/source/components/**/*.{scss,js,md}",
    "assets/source/structures/**/*.{scss,js,md}",
    "assets/source/behaviors/**/*.{scss,js,md}",
    "assets/source/utilities/**/*.{scss,js,md}",
    "assets/source/foundation/**/*.{scss,js,md}"
  ]

  config.destination = "public"

  config.compiled_assets = [
    "pattern-library.css",
    "pattern_library.js"
  ]

  config.asset_folders = {
    scripts: "scripts",
    styles: "styles",
    templates: "templates/erb",
    images: "images"
  }

  config.library_assets = "assets"
  config.mount_at = "pattern-library"
  config.copy_bundled_assets = false
  config.github_repo = "lemonmade/docks"

  config.pattern_id = lambda do |file|
    dir = File.basename(File.dirname(file))
    %w(vendor foundation .).include?(dir) ? File.basename(file).split(".").first : dir
  end
end
