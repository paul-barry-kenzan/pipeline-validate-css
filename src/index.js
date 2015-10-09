/*global require, module */

'use strict';

var handyman = require('pipeline-handyman');
var lazypipe = require('lazypipe');
var plugins = require('gulp-load-plugins')({lazy: true});
var gulpFilter = require('gulp-filter');

var config = {
  output: 'dist/'
};

module.exports = validatePipeline;

function validatePipeline(options) {

  if (config) {
    config = handyman.updateConf(config, options);
  }

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
