'use strict';

var gulpUtil = require('gulp-util');
var handyman = require('pipeline-handyman');

module.exports = function cssLintFormatter (file) {
  var color = gulpUtil.colors;

  file.messages.forEach(function (result) {
    var call = ' line ' + result.line + '   col ' + result.col + '   =>   ' + result.message;

    handyman.log(color.gray(call));
  });

};