var path = require("path"),
    sources, destination, config;

sources = {
  styles: {
    all: ["assets/source/**/*.scss"],
    main: [
      "assets/source/pattern-library.scss",
      "assets/source/pattern-library-demo.scss"
    ]
  },
  scripts: {
    all: [
      "assets/source/**/!(spec)/*.js",
      "!assets/source/vendor/**/*.js"
    ],
    main: [
      "assets/source/pattern_library.js",
      "assets/source/pattern_library_demo.js"
    ],
    spec: ["assets/source/**/*_spec.js"]
  },
  templates: {
    all: ["assets/templates/erb/**/*.erb"]
  }
};

destination = {
  styles: "assets/styles",
  scripts: "assets/scripts",
  pattern_library: {
    styles: "public/styles",
    scripts: "public/scripts"
  }
};

config = {
  source: sources,
  destination: destination,

  plugins: {
    // Might want to try this: https://www.npmjs.com/package/bs-html-injector
    browser_sync: {
      open: false,
      files: [
        "public/**/*.{css,js}",
        "public/pattern-library/**/*.html"
      ],
      server: {
        baseDir: "public"
      }
    },

    browserify: {},

    babel: {
      optional: ["runtime"],
      plugins: [
        path.resolve(__dirname, "../utilities/babel/relative_require.js"),
        path.resolve(__dirname, "../utilities/babel/spec_helper.js")
      ],
      stage: 0
    },

    docks: {
      command: "docks"
    },

    css_globbing: {
      extensions: [".scss", ".sass"]
    },

    sass: {
      errLogToConsole: true
    },

    autoprefixer: {
      browsers: ["last 2 versions", "> 5%"]
    }
  }
};

config.plugins.karma = (function() {
  var files = config.source.scripts.spec,
      preprocessors;
  if(!Array.isArray(files)) { files = [files]; }

  preprocessors = {};
  files.map(function(file) {
    preprocessors[file] = "browserify";
  });

  files = [
    "https://code.jquery.com/jquery-1.11.2.min.js"
  ].concat(files);

  return {
    basePath: "",
    frameworks: ["mocha", "browserify", "es6-shim"],
    files: files,
    preprocessors: preprocessors,
    browserify: {
      debug: true,
      transform: [
        ["babelify", config.plugins.babel]
      ]
    },
    reporters: ["dots"],
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ["PhantomJS"]
  };
})();

module.exports = config;
