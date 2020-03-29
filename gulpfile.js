//used gulp modules
var gulp = require("gulp"),
  notify = require("gulp-notify"),
  sass = require("gulp-sass"),
  imagemin = require("gulp-imagemin"),
  autoprefixer = require("gulp-autoprefixer"),
  plumber = require("gulp-plumber"),
  jshint = require("gulp-jshint"),
  cssbeauty = require("gulp-cssbeautify"),
  pug = require("gulp-pug"),
  pugBeauty = require("gulp-pug-beautify"),
  babel = require("gulp-babel"),
  minify = require("gulp-minify"),
  changed = require("gulp-changed"),
  cache = require("gulp-cache"),
  remember = require("gulp-remember"),
  critical = require("critical").stream,
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify-es").default,
  babelify = require("babelify"),
  buffer = require("vinyl-buffer"),
  source = require("vinyl-source-stream"),
  svgmin = require("gulp-svgmin"),
  browserify = require("browserify"),
  clean = require("gulp-clean"),
  realFavicon = require("gulp-real-favicon"),
  fontName = "iconsmoon",
  fs = require("fs"),
  htmlbeautify = require("gulp-html-beautify");

let browserSync = require("browser-sync").create();

//paths config
var config = {
  srcPath: "src",
  distPath: "dist",

  src: {
    styles: "src/styles/**/**/*.scss",
    templates: "src/templates/**/*.pug",
    images: "src/images/**",
    fonts: "src/fonts/**",
    scripts: "src/js/*.js",
    libjs: "src/lib/js/*.js",
    libcss: "src/lib/css/*.scss",
    files: "src/files/**"
  },

  dist: {
    styles: "dist/assets/css",
    images: "dist/assets/images/",
    fonts: "dist/assets/fonts",
    scripts: "dist/assets/js",
    libjs: "dist/assets/js/lib",
    libcss: "dist/assets/css/lib",
    files: "dist/assets/files/"
  }
};

const options = {
  indentSize: 2,
  unformatted: [
    // https://www.w3.org/TR/html5/dom.html#phrasing-content
    "abbr",
    "area",
    "b",
    "bdi",
    "bdo",
    "br",
    "cite",
    "code",
    "data",
    "datalist",
    "del",
    "dfn",
    "em",
    "embed",
    "i",
    "ins",
    "kbd",
    "keygen",
    "map",
    "mark",
    "math",
    "meter",
    "noscript",
    "object",
    "output",
    "progress",
    "q",
    "ruby",
    "s",
    "samp",
    "small",
    "strong",
    "sub",
    "sup",
    "template",
    "time",
    "u",
    "var",
    "wbr",
    "text",
    "acronym",
    "address",
    "big",
    "dt",
    "ins",
    "strike",
    "tt"
  ]
};

//TASKS SETUP//

gulp.task("iconfont", function() {
  gulp
    .src(["src/images/static/*.svg"])
    .pipe(
      iconfontCss({
        fontName: fontName,
        targetPath: "../../../src/styles/fonts/_icons.scss",
        fontPath: "../fonts/icons/",
        cssClass: "icon"
      })
    )
    .pipe(
      iconfont({
        fontName: fontName,
        normalize: true
      })
    )
    .pipe(gulp.dest("src/fonts/icons"));
});

// File where the favicon markups are stored
var FAVICON_DATA_FILE = "faviconData.json";

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task("generate-favicon", function(done) {
  realFavicon.generateFavicon(
    {
      masterPicture: "src/images/static/favicon.svg",
      dest: "dist/",
      iconsPath: ".",
      design: {
        ios: {
          pictureAspect: "noChange",
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true
          }
        },
        desktopBrowser: {},
        windows: {
          pictureAspect: "noChange",
          backgroundColor: "#da532c",
          onConflict: "override",
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false
            }
          }
        },
        androidChrome: {
          pictureAspect: "noChange",
          themeColor: "#ffffff",
          manifest: {
            display: "standalone",
            orientation: "notSet",
            onConflict: "override",
            declared: true
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false
          }
        }
      },
      settings: {
        scalingAlgorithm: "Mitchell",
        errorOnImageTooSmall: false
      },
      markupFile: FAVICON_DATA_FILE
    },
    function() {
      done();
    }
  );
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task("inject-favicon-markups", function() {
  return gulp
    .src(["dist/*.html"])
    .pipe(
      realFavicon.injectFaviconMarkups(
        JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code
      )
    )
    .pipe(gulp.dest("dist"));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task("check-for-favicon-update", function(done) {
  var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, function(err) {
    if (err) {
      throw err;
    }
  });
});

gulp.task("babelify", function() {
  var bundler = browserify({
    entries: "src/tmp/main.js",
    debug: true
  });
  bundler.transform(babelify);
  bundler
    .bundle()
    .on("error", function(err) {
      console.error(err);
    })
    .pipe(source("main.js"))
    .pipe(buffer())
    .pipe(
      babel({
        presets: ["es2015"]
      })
    )
    .pipe(gulp.dest("dist/assets/js"));
  return new Promise(function(resolve, reject) {
    resolve();
  });
});

gulp.task("clean", function() {
  return gulp.src("src/tmp").pipe(clean({ force: true }));
});

//Generate & Inline Critical-path CSS
gulp.task("critical", function() {
  return gulp
    .src("dist/*.html")
    .pipe(
      critical({
        base: "dist/",
        inline: true,
        css: ["dist/assets/css/main.css", "dist/assets/css/media.css"]
      })
    )
    .on("error", function(err) {
      log.error(err.message);
    })
    .pipe(gulp.dest("*.html"));
});

//compile scss to css (gulp styles)
gulp.task("styles", function() {
  return (
    gulp
      .src(["src/lib/css/*.css", "src/lib/css/*.scss", "src/styles/**/*.scss"])
      .pipe(plumber())
      .pipe(sass({ style: "compressed" }).on("error", notify.onError()))
      .pipe(
        autoprefixer(
          "last 2 version",
          "safari 5",
          "ie 8",
          "ie 9",
          "opera 12.1",
          "ios 6",
          "android 4"
        )
      )
      //.pipe(cssbeauty())
      .pipe(concat("styles.css"))
      .pipe(gulp.dest(config.dist.styles)) //create beauty css file
      .pipe(notify({ message: "Styles task complete!" }))
  );
});

//compile lib (gulp lib - its just a css libs)
gulp.task("libcss", function() {
  return gulp
    .src(config.src.libcss)
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(
      autoprefixer(
        "last 2 version",
        "safari 5",
        "ie 8",
        "ie 9",
        "opera 12.1",
        "ios 6",
        "android 4"
      )
    )
    .pipe(gulp.dest(config.dist.libcss)) //create beauty css file
    .pipe(notify({ message: "Styles task complete!" }));
});

//build css
gulp.task("css", function() {
  return gulp.src([config.src.styles, config.src.libcss]);
});

//compile pug to html (gulp templates)
gulp.task("templates", function() {
  return gulp
    .src(config.src.templates)
    .pipe(plumber())
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest(config.distPath))
    .pipe(htmlbeautify(options))
    .pipe(notify({ message: "Templates task complete!" }));
});

//compile images (gulp images)
gulp.task("images", function() {
  return gulp
    .src(config.src.images)
    .pipe(
      cache(
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.jpegtran({ progressive: true }),
          imagemin.optipng({ optimizationLevel: 10 }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
          })
        ])
      )
    )
    .pipe(gulp.dest(config.dist.images))
    .pipe(notify({ message: "Images task complete!" }));
});

//compile fonts (gulp fonts)
gulp.task("fonts", function() {
  return gulp
    .src(config.src.fonts)
    .pipe(gulp.dest(config.dist.fonts))
    .pipe(notify({ message: "Fonts task complete!" }));
});

//compile scripts (gulp scripts)
gulp.task("scripts", function() {
  return gulp
    .src(config.src.scripts)
    .pipe(plumber())
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(jshint.reporter("default"))
    .pipe(gulp.dest(config.dist.scripts))
    .pipe(notify({ message: "Scripts task complete!" }));
});

//compile lib (gulp lib - its just a js libs)
gulp.task("libjs", function() {
  return gulp
    .src(config.src.libjs)
    .pipe(
      minify({
        ext: {
          min: ".js"
        },
        exclude: ["tasks"],
        ignoreFiles: [".min.js", "-min.js"]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(config.dist.libjs))
    .pipe(notify({ message: "Libjs transfered!" }));
});

gulp.task("files", function() {
  return gulp
    .src(config.src.files)
    .pipe(gulp.dest(config.dist.files))
    .pipe(notify({ message: "Files task complete!" }));
});

gulp.task("minjs", function() {
  return gulp
    .src(["dist/assets/js/main.js"])
    .pipe(concat("main.js"))
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(config.dist.scripts));
});

gulp.task("concat", function() {
  return gulp
    .src(["src/lib/js/*.js", "src/js/main.js"])
    .pipe(concat("main.js"))
    .pipe(gulp.dest("src/tmp"));
});

gulp.task("vendors-js", function() {
  return gulp
    .src("src/lib/js/*.js")
    .pipe(concat("vendors.js"))
    .pipe(gulp.dest("dist/assets/js"));
});

gulp.task(
  "common-js",
  gulp.series(function() {
    return (
      gulp
        .src(["src/js/main.js"])
        .pipe(concat("main.min.js"))
        .pipe(
          babel({
            presets: ["env"]
          })
        )
        //.pipe(uglify())
        .pipe(gulp.dest("src/js"))
    );
  })
);

gulp.task("html", function() {
  return gulp
    .src("dist/pages/*.html")
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest("dist/pages"));
});

gulp.task(
  "js",
  gulp.series("common-js", function() {
    return (
      gulp
        .src([
          //'src/lib/js/*js',
          "src/js/maps/*js",
          "src/js/main.min.js" // Всегда в конце
        ])
        .pipe(concat("scripts.min.js"))
        //.pipe(uglify()) // Минимизировать весь js (на выбор)
        .pipe(gulp.dest("dist/assets/js"))
    );
  })
);

gulp.task("serve", () => {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });
});

//watch changes
gulp.task("watch", function() {
  gulp.watch(
    ["src/lib/css/*.scss", "src/styles/**/*.scss"],
    gulp.parallel("styles")
  );

  gulp.watch(config.src.templates, gulp.parallel("templates"));

  gulp.watch(config.src.files, gulp.parallel("files"));

  gulp.watch(config.src.images, gulp.parallel("images"));

  gulp.watch(config.src.fonts, gulp.parallel("fonts"));

  //gulp.watch(config.src.scripts, gulp.series('concat', 'babelify'));

  gulp.watch(
    ["src/lib/js/**/*.js", "src/js/maps/*js", "src/js/main.js"],
    gulp.series("js")
  );

  //gulp.watch(config.src.libjs, gulp.parallel('libjs'));

  gulp.watch(config.src.libcss, gulp.parallel("libcss"));

  gulp.watch(config.src.files, gulp.parallel("files"));
  gulp.watch("dist/**/*").on("change", browserSync.reload);
});

// Обычная сборка
gulp.task(
  "build",
  gulp.series(
    "styles",
    "templates",
    "html",
    "fonts",
    "js",
    "vendors-js",
    "files",
    // "images"
  )
);

// С минификацией
gulp.task(
  "build-min",
  gulp.series([
    "templates",
    "fonts",
    "babelify",
    "minjs",
    "libcss",
    "files",
    // "images",
    "clean"
  ])
);

gulp.task("default", gulp.series("build", gulp.parallel("serve", "watch")));
