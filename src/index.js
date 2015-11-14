/*global require, module */

'use strict';

var csslint = require('gulp-csslint');
var lazypipe = require('lazypipe');
var util = require('gulp-util');
var gulpFilter = require('gulp-filter');

module.exports = validatePipeline;

function validatePipeline() {

  var pipeline = {
    validateCSS: validateCSS()
  };

  var cssFilter = gulpFilter('*.css', {matchBase: true, restore: true});

  return pipeline;

  function validateCSS() {
    return lazypipe()
      .pipe(function() {
        return cssFilter;
      })
      .pipe(csslint)
      .pipe(csslint.reporter, 'fail')
      .pipe(csslint.reporter, customReporter)
      .pipe(function() {
        return cssFilter.restore;
      });
  }

  function customReporter(file) {
    var color = util.colors;

    util.log(color.red('Errors in: ' + file.path));

    file.csslint.results.forEach(function(result) {
      util.log(color.grey('line ' + result.error.line + ':' + result.error.message));
    });

    util.log(color.red(' -- End Errors -- '));
  }

}