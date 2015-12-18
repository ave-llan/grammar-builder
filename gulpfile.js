var gulp         = require('gulp')
  , source       = require('vinyl-source-stream')
  , streamify    = require('gulp-streamify')
  , browserify   = require('browserify')
  , uglify       = require('gulp-uglify')
  , rename       = require('gulp-rename')
  , sass         = require('gulp-sass')
  , autoprefixer = require('gulp-autoprefixer')
  , browserSync  = require('browser-sync').create();

// using vinyl-source-stream:
gulp.task('browserify', function () {
  var bundleStream = browserify('./src/app.js').bundle();

  bundleStream
    .pipe(source('index.js'))
    .pipe(streamify(uglify()))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function () {
  gulp.src('src/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
});

gulp.task('build', function () {
  gulp.src('dist/index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', function () {
  gulp.watch('sass/**/*.scss', ['styles']);
});