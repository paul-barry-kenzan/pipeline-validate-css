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
    .pipe(cssLint.formatter, customFormatter)
    .pipe(function() {
      handyman.log('Restoring CSS Filter.');
      return cssFilter.restore;
    });

  return stream();
}

function customFormatter(file) {
  var color = gulpUtil.colors;

  file.messages.forEach(function(result) {
    var call = ' line ' + result.line + '   col ' + result.col + '   =>   ' + result.message;

    handyman.log(color.gray(call));
  });
}