'use strict';

var expect = require('chai').expect;
var validatePipeline = require('../src/index.js');
var gulp = require('gulp');
var path = require('path');
var isStream = require('isstream');

var fixtures = function (glob) { return path.join(__dirname, 'fixtures', glob); };

describe('pipeline-validate-css', function() {

  it('Should return the stream after validation', function (done) {
    var stream = gulp
      .src(fixtures('*'))
      .pipe(validatePipeline().validateCSS());

    expect(isStream(stream)).to.equal(true);
    done();
  });

  it('Should return the stream with custom reporting', function (done) {
    var stream = gulp
      .src(fixtures('*'))
      .pipe(validatePipeline().validateCSS({
        csslint: {
          reporter: function() {
            return true;
          }
        }
      }));

    expect(isStream(stream)).to.equal(true);
    done();
  });

});