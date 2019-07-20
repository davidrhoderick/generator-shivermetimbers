var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    include     = require('gulp-include'),
    browserSync = require('browser-sync').create(),
    jshint      = require('gulp-jshint'),
    minify      = require('gulp-minify'),
    sassLint    = require('gulp-sass-lint'),
    notify      = require('gulp-notify');

gulp.task('sass', function(){
  return gulp.src('static/scss/style.scss')
    .pipe(sass())
      .on('error', notify)
    .pipe(sassLint({
      files: { ignore: 'static/bower_components/**/*.scss' }
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
  return gulp.src('static/js/site.js')
    .pipe(include())
      .on('error', notify)
    .pipe(jshint.reporter('default'))
    .pipe(minify({
      ext:{
        src: '.js',
        min: '.min.js'
      }
    }))
    .pipe(gulp.dest('static'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['sass', 'js'], function () {
  browserSync.init({
    proxy: '<%= proxy %>'
  });

  gulp.watch('static/scss/**/*.scss', ['sass']);
  gulp.watch('static/js/**/*.js', ['js']);
  gulp.watch(['*.php', 'templates/**/*.twig']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);