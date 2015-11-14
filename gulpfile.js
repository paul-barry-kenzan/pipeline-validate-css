'use strict';

var gulp = require('gulp');
var testPipeline = require('pipeline-test-node')();
var validateCssPipeline = require('./src/index.js')();
var validateJsPipeline = require('pipeline-validate-js')();

var config = {
  jsFiles: [
    '*.js',
    'src/*.js',
    'test/*.js'
  ],

  cssFiles: [
   'test/**/*.css'
  ]

};

gulp.task('validate', function() {
  return gulp
    .src(config.jsFiles)
    .pipe(validateJsPipeline.validateJS())
    .pipe(testPipeline.test());
});

gulp.task('build', ['validate'] , function() {
  return gulp
    .src(config.cssFiles)
    .pipe(validateCssPipeline.validateCSS());
});