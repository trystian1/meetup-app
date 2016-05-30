// var gulp = require("gulp");
// var sourcemaps = require("gulp-sourcemaps");
// var babel = require("gulp-babel");
// var concat = require("gulp-concat");
// var browserify = require("gulp-browserify");
//
// gulp.task("default", function () {
//   return gulp.src("app/**/*.js")
//     .pipe(sourcemaps.init())
//     .pipe(babel())
//     .pipe(concat("all.js"))
//     .pipe(sourcemaps.write("."))
//     .pipe(gulp.dest("dist"));
// });
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

function compile(watch) {
  var bundler = watchify(browserify('./app/main.js', { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);
