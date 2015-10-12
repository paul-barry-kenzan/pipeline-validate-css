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

  return pipeline;

  function validateCSS() {
    return lazypipe()
      .pipe(plugins.csslint)
      .pipe(gulpFilter, '*.css', {matchBase: true})
      .pipe(plugins.csslint.reporter, customReporter);
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
