/* global require, module */
'use strict';

var cssLint = require('gulp-csslint');
var handyman = require('pipeline-handyman');
var lazypipe = require('lazypipe');
var formatter = require('./formatter');

module.exports = {
  validateCSS: function (options) {
    var config = generatePipelineOptions(options);

    return pipelineFactory(config);
  }
};

function pipelineFactory (config) {
  var stream;

  stream = lazypipe()
    .pipe(cssLint, config)
    .pipe(cssLint.formatter, formatter);

  return stream();
}

function generatePipelineOptions (options) {
  return handyman.mergeConfig({}, options);
}