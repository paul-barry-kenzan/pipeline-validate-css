'use strict';

var gulp = require('gulp');
var testPipeline = require('pipeline-test-node');
var validateCSSPipeline = require('./src/index.js');
var validateJSPipeline = require('pipeline-validate-js');

var config = {
  jsfiles: [
   'src/*.js',
   'test/**/*.js',
   'test/*.js'
  ],

  cssFiles: [
   'test/**/*.css'
  ],

  test: {
    plugins: {
      istanbul: {
        thresholds: {
          global: 60
        }
      }
    }
  }

};

gulp.task('validateJS', function() {
  return gulp
    .src(config.jsfiles)
    .pipe(validateJSPipeline.validateJS());
});

gulp.task('validateCSS', ['validateJS'], function() {
  return gulp
    .src(config.cssFiles)
    .pipe(validateCSSPipeline.validateCSS());
});

gulp.task('build', ['validateJS', 'validateCSS'], function() {

  return gulp
    .src(config.jsfiles)
    .pipe(testPipeline.test(config.test));
});