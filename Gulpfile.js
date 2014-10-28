var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect');

// Render main.styl file
gulp.task('style-guide-css', function () {
  gulp.src('./css/styl/style-guide.styl')
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

// Render style-guide.styl file
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

gulp.task('style-guide-watch', function () {
  gulp.watch('css/styl/**/*.styl', ['style-guide-css']);
  gulp.watch(['./**/*.html', 'js/main.js', 'js/plugins.js', 'css/*.css'], ['reload']);
});

gulp.task('style', ['style-guide-css', 'connect', 'style-guide-watch']);

gulp.task('default', ['main-css', 'style-guide-css', 'connect', 'watch']);