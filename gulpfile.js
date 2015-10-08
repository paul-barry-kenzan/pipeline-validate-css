'use strict';

var gulp = require('gulp');
var validateCssPipeline = require('./src/index.js')();
var validatePipeline = require('pipeline-validate-js')();
var del = require('del')

var config = {
  files: [
   'src/**/*.js',
  ],

  cssFiles: [
   'test/**/*.css'
  ]

};

gulp.task('validate', function() {
  return gulp
    .src(config.files)
    .pipe(validatePipeline.validateJS());
});

gulp.task('default', ['clean', 'validate'] , function() {
  return gulp
    .src(config.cssFiles)
    .pipe(validateCssPipeline.validateCSS());
});

gulp.task('clean', function () {
  return del.sync([
    './dist/**'
  ]);
});
