/*global require, module */

'use strict';

var lazypipe = require('lazypipe');
var plugins = require('gulp-load-plugins')({lazy: true});
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
      .pipe(plugins.csslint)
      .pipe(plugins.csslint.reporter, customReporter)
      .pipe(plugins.csslint.reporter, 'fail')
      .pipe(function() {
        return cssFilter.restore;
      });
  }

  function customReporter(file) {
    var color = plugins.util.colors;
    plugins.util.log(color.red('Errors in: ' + file.path));
    file.csslint.results.forEach(function(result) {
      plugins.util.log(color.grey('line ' + result.error.line + ':' + result.error.message));
    });
    plugins.util.log(color.red(' -- End Errors -- '));
  }

}
