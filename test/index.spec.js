/*global require */
'use strict';

var compilePipeline = require('../');
var gulp = require('gulp');
var path = require('path');
var assert = require('stream-assert');
var should = require('chai').should();

var fixtures = function (glob) { return path.join(__dirname, 'fixtures', glob); };

describe('pipeline-compile-less', function() {

  var testPath = path.join(__dirname, 'dist');

  it('Should output the same number of files compiled', function (done) {
    gulp
      .src(fixtures('*'))
      .pipe(compilePipeline({addSourceMaps: false, output: testPath}).compileLESS())
      .pipe(assert.length(2))
      .pipe(assert.end(done));
  });

  it('Should output the same number of files compiled and the map for each one', function (done) {
    gulp
      .src(fixtures('*'))
      .pipe(compilePipeline({addSourceMaps: true, output: testPath}).compileLESS())
      .pipe(assert.length(4))
      .pipe(assert.end(done));
  });

  it('Should generate a single concatenate file', function (done) {
    gulp
      .src(fixtures('*'))
      .pipe(compilePipeline({addSourceMaps: false, concatCSS:true, output: testPath}).compileLESS())
      .pipe(assert.length(1))
      .pipe(assert.first(function (d) { d.relative.toString().should.eql('concat.css'); }))
      .pipe(assert.end(done));
  });

});
