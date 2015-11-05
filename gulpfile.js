'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var express = require('express');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var please = require('gulp-pleeease');
var lib = require('bower-files')({
  overrides: {
    bootstrap: {
      main: [
        'dist/js/bootstrap.js',
        'dist/css/bootstrap.css',
        'dist/fonts/*'
      ]
    }
  }
});

gulp.task('default', [
  'scripts',
  'styles',
  'static',
  'fonts'
]);

gulp.task('watch', [
  'scripts.watch',
  'static.watch',
  'styles.watch',
  'fonts',
  'livereload',
  'server'
]);

gulp.task('scripts', function() {
  return gulp.src(
    lib.ext('js').files
      .concat('public/scripts/**/*.js')
  )
    .pipe(sourcemaps.init())
      .pipe(concat('app.min.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('public/build/js'));
});

gulp.task('scripts.watch', ['scripts'], function() {
  gulp.watch('public/scripts/**/*.js', ['scripts']);
});

gulp.task('styles', function() {
  return gulp.src(
    lib.ext('css').files
      .concat('public/styles/*.css')
  )
    .pipe(sourcemaps.init())
      .pipe(concat('app.min.css'))
      .pipe(please())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('public/build/css'));
});

gulp.task('styles.watch', ['styles'], function() {
  gulp.watch('public/styles/*.css', ['styles']);
});

gulp.task('static', function() {
  return gulp.src('public/static/**')
    .pipe(gulp.dest('public/build'));
});

gulp.task('static.watch', ['static'], function() {
  gulp.watch('public/static/**', ['static']);
});

gulp.task('fonts', function() {
  return gulp.src(lib.ext(['eot', 'svg', 'ttf', 'woff', 'woff2',]).files)
    .pipe(gulp.dest('public/build/fonts'));
});

gulp.task('server', function() {
  nodemon({
    script: './bin/www',
    ext: 'js'
  })
});

gulp.task('livereload', function() {
  var server = livereload.listen();
  gulp.watch('public/build/**', function(event) {
    livereload.changed(event);
  });
});
