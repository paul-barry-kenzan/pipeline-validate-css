/*global require, module */

'use strict';

var handyman = require('pipeline-handyman');
// var gulp = require('gulp');
var lazypipe = require('lazypipe');
var plugins = require('gulp-load-plugins')({lazy: true});

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
      .pipe(plugins.csslint.reporter, customReporter);
  }

  function customReporter(file) {

    plugins.util.log(plugins.util.colors.red('Errors in: ' + file.path));
    file.csslint.results.forEach(function(result) {
      plugins.util.log(plugins.util.colors.grey('line ' + result.error.line + ':' + result.error.message));
    });
    plugins.util.log(plugins.util.colors.red(' -- End Errors -- '));
  }

}
