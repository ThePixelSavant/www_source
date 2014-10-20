var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect');

// Use nib
gulp.task('nib', function () {
  gulp.src('./css/styl/modules/nib.styl')
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest('./css/styl'));
});

// Get main.styl file and render
gulp.task('main-css', function () {
  gulp.src('./css/styl/main.styl')
    .pipe(stylus({use: [nib()], import: ['nib']}))
    .pipe(gulp.dest('./css'));
});

// Stylus External sourcemaps
gulp.task('sourcemaps-external', function () {
  gulp.src('./css/styl/main.styl')
    .pipe(stylus({
      sourcemap: {
        inline: true,
        sourceRoot: '.',
        basePath: 'css'
      }
    }))
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    // Here you can you can use plugins that supports gulp-sourcemaps.
    // See gulp-sourcemaps readme for a list of such plugins.
    // For example, using pleeease:
    // .pipe(pleeease({
    //   minifier: false,
    //   sourcemaps: true
    // }))
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
  gulp.watch('css/styl/**/*.styl', ['main-css', 'sourcemaps-external']);
  gulp.watch(['./**/*.html', 'js/main.js', 'js/plugins.js', 'css/main.css'], ['reload']);
});

gulp.task('default', ['main-css', 'sourcemaps-external', 'connect', 'watch']);