var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect');

// Get main.styl file and render
gulp.task('main-css', function () {
  gulp.src('./css/styl/main.styl')
    .pipe(stylus({
      use: [nib()],
      import: ['nib'],
      sourcemap: {
        inline: true,
        sourceRoot: '.',
        basePath: 'css'
      }
    }))
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write('.', {
      includeConent: false,
      sourceRoot: '.'
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('connect', function () {
  connect.server({
    root: './',
    port: '1881',
    livereload: true
  });
});

gulp.task('reload', function () {
  gulp.src(['./**/*.html'])
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('css/styl/**/*.styl', ['main-css']);
  gulp.watch(['./**/*.html', 'js/main.js', 'js/plugins.js', 'css/main.css'], ['reload']);
});

gulp.task('default', ['main-css', 'connect', 'watch']);