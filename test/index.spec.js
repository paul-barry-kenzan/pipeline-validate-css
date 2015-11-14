'use strict';

var expect = require('chai').expect;
var gulp = require('gulp');
var isStream = require('isstream');

var successFixtures = ['./test/fixtures/test-css1.css', './test/fixtures/test-css2.css'];

describe('pipeline-validate-css', function() {

  it('Should return the stream after validation', function (done) {
    var validatePipeline = require('../src/index.js');
    var stream = gulp
      .src(successFixtures)
      .pipe(validatePipeline().validateCSS());

    expect(isStream(stream)).to.equal(true);
    done();
  });

  it('Should return the stream with custom reporting success', function (done) {
    var validatePipeline = require('../src/index.js');
    var stream = gulp
      .src(successFixtures)
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

  it('Should return the stream with custom reporting failed', function (done) {
    var validatePipeline = require('../src/index.js');
    var stream = gulp
      .src(['./test/fixtures/test-css3.css'])
      .pipe(validatePipeline().validateCSS());

    expect(isStream(stream)).to.equal(true);
    done();
  });

});