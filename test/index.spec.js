/*global require */
'use strict';

var validatePipeline = require('../');
var gulp = require('gulp');
var path = require('path');
var should = require('chai').should();
var isStream = require('isstream');

var fixtures = function (glob) { return path.join(__dirname, 'fixtures', glob); };

describe('pipeline-validate-css', function() {

  var testPath = path.join(__dirname, 'dist');

  it('Should return the stream after validation', function (done) {
    var stream = gulp
      .src(fixtures('*'))
      .pipe(validatePipeline().validateCSS());

      isStream(stream).should.equal(true);
      done();
  });

});
