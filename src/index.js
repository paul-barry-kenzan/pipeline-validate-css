/* global require, module */
'use strict';

var cssLint = require('gulp-csslint');
var handyman = require('pipeline-handyman');
var lazypipe = require('lazypipe');
var formatter = require('./formatter');

module.exports = {
  validateCSS: function () {
    return pipelineFactory();
  }
};

function pipelineFactory () {
  var stream;

  handyman.log('Validating CSS files.');
  stream = lazypipe()
    .pipe(cssLint)
    .pipe(cssLint.formatter, formatter);

  return stream();
}