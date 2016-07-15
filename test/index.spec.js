/* global require */
'use strict';

var chai = require('chai');
var gulp = require('gulp');
var handyman = require('pipeline-handyman');
var isStream = require('isstream');
var path = require('path');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var validateCSSPipeline = require('../src/index');

var fixtures = function (glob) {
  return path.join(__dirname, 'fixtures', glob);
};

chai.should();
chai.use(sinonChai);

describe('pipeline-validate-css', function() {
  describe('Passing correct CSS', function() {
    var stream;

    it('Should return the stream after validation', function (done) {
      stream = gulp
	      .src(fixtures('test-css2.css'))
	      .pipe(validateCSSPipeline.validateCSS());

      isStream(stream).should.equal(true);
      done();
    });
  });
});

describe('check inner functions spies', function() {
  var sandbox = {};
  var spy = {};

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    spy = sandbox.spy(handyman, 'log');
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should be called once validateCSS is called', function() {
    validateCSSPipeline.validateCSS();
    spy.should.have.been.calledWith('Validating CSS files.');
  });

  it('should be called once customReporter is called', function() {
    validateCSSPipeline.validateCSS();
    spy.should.have.been.calledWith('Restoring CSS Filter.');
  });

  // @TODO Write tests to handle invalid file simulation
});
