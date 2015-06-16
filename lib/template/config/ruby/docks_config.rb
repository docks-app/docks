Docks.configure do |config|

  # An array of glob patterns specifying all source files. These will be the
  # sources for all of your library's patterns. Include any style, script,
  # markup, stub, and description files you have to document your patterns.
  # These paths should be relative to the root of your project.
  config.sources = [
    "styles/**/*.{css,scss,sass,less,styl}",
    "scripts/**/*.{js,coffee,coffeescript}"
  ]

  # The destination folder in which you would like to generate the static
  # pattern library. This path should be relative to the root of your project.
  config.destination = "public"

  # When generating your static styleguide, these assets will be included
  # in the default layout file automatically (via a `link` tag when the asset
  # is a stylesheet, and via a `script` tag when it is a JavaScript file).
  #
  # These assets must be compiled — Docks will not compile assets for you
  # automatically. Feel free to omit this option if you are going to manually
  # add the required asset tags to your layout file. These paths should be
  # relative to the root of your project.
  config.compiled_assets = [
    "public/styles/style.css",
    "public/scripts/script.js"
  ]

  # This option determines where Docks should look for assets of different
  # types. This is primarily used in determining where templates for your pages
  # are and by the path helpers in determining where stylesheets and script
  # files should be in order to create the appropriate links to them from your
  # templates. It is also used to determine where some of the bundled assets are
  # for use by the default theme. If you change the folder names in your pattern
  # library assets folder, make sure that those names correspond to these ones.
  #
  # These folders are relative to the root of your destination/ source assets
  # directories, not to your project's root.
  config.asset_folders = {
    scripts:   "scripts",
    styles:    "styles",
    templates: "templates",
    images:    "images"
  }

  # The folder in which the source assets for the static pattern library are
  # located. You do not need to include your own assets in this folder — it is
  # used primarily to contain the template files and the Docks-provided styles
  # and scripts. If you use relative references for custom templates, though,
  # they will be relative to the templates folder of this directory.
  # Additionally, all compiled asset types (CSS, JavaScript, and images) will be
  # copied from here to the destination folder during builds.
  #
  # When running `docks init`, the starter assets will be added to a folder named
  # `pattern_library_assets`. If you rename that folder, please rename it here,
  # also. This path should be relative to the root of your project.
  config.library_assets = "pattern_library_assets"

  # The root path of your pattern library. When generating a static version,
  # all pattern files will be nested inside this directory.
  config.mount_at = "pattern-library"

  # The name of the Github repo for this project. This can either be the URL or
  # in the form `<username>/<repo>`. The default theme uses this option, if
  # passed, to provide links to create issue and view source for your pattern
  # library's files.
  config.github_repo = ""

  config.custom_templates do |templates|
    templates.default = "pattern.erb"
    templates.demo = "demo.erb"
  end

  # The naming convention to use for such things as identifying a state versus
  # a variant and determining the base class of a given variation. There are
  # a few bundled naming conventions, viewable under lib/docks/naming_conventions.
  # You can either pass a string with the name of the desired naming convention
  # (capitalization is important) or pass an instance of a naming convention
  # instance. If creating your own naming convention, make sure to inherit and
  # override all methods in `Docks::Naming::Conventions::Base`.
  config.naming_convention = "BEM"

  # A list of file names or Modules that contain helper modules needed to render
  # your components, or that you want available to be used inside your views.
  #
  # If you pass a list of files, every module in each file will be included in
  # the renderer so that you have access to them in all of your templates. These
  # files should be relative to the root of your project.
  #
  # If you pass a list of modules, no additional work is required on your part.
  # These will be included automatically in all template rendering.
  config.helpers = []

  config.pattern_id do |file|
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
