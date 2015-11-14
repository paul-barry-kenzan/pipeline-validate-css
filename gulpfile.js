'use strict';

var gulp = require('gulp');
var validateCssPipeline = require('./src/index.js')();
var validatePipeline = require('pipeline-validate-js')();

var config = {
  files: [
   'src/*.js'
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

gulp.task('default', ['validate'] , function() {
  return gulp
    .src(config.cssFiles)
    .pipe(validateCssPipeline.validateCSS());
});
