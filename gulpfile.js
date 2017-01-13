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

gulp.task('lint:js', function() {
  return gulp
    .src(config.jsfiles)
    .pipe(validateJSPipeline.validateJS());
});

gulp.task('lint:css', function() {
  return gulp
    .src(config.cssFiles)
    .pipe(validateCSSPipeline.validateCSS());
});

gulp.task('test', ['lint:js'], function() {
  return gulp
    .src(config.jsfiles)
    .pipe(testPipeline.test(config.test));
});

gulp.task('build', ['test', 'lint:css']);