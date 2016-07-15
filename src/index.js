/* global require, module */
'use strict';

var cssLint = require('gulp-csslint');
var gulpFilter = require('gulp-filter');
var gulpUtil = require('gulp-util');
var handyman = require('pipeline-handyman');
var lazypipe = require('lazypipe');

var cssFilter = gulpFilter('*.css', { matchBase: true, restore: true });

module.exports = {
  validateCSS: function() {
    return pipelineFactory();
  }
};

function pipelineFactory() {
  var stream;

  handyman.log('Validating CSS files.');
  stream = lazypipe()
    .pipe(function() {
      return cssFilter;
    })
    .pipe(cssLint)
    .pipe(cssLint.reporter)
    .pipe(cssLint.reporter, customReporter)
    .pipe(cssLint.failReporter)
    .pipe(function() {
      handyman.log('Restoring CSS Filter.');
      return cssFilter.restore;
    });

  return stream();
}

function customReporter(file) {
  var color = gulpUtil.colors;

  file.csslint.results.forEach(function(result) {
    handyman.log(color.red('Errors in: ' + file.path));
    handyman.log(color.grey('line ' + result.error.line + ':' + result.error.message));
  });
}