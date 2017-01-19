/* global require */
'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var handyman = require('pipeline-handyman');

var formatter = require('../src/formatter');

describe('CSS Lint Formatter Utility', function () {

  it('should expose a formatter function', function () {
    expect(formatter).to.be.a('function');
  });

  it('should utilize handyman.log for each file message', function () {
    var file = {
      messages: [
        {
          line: 2,
          col: 10,
          message: 'invalid line'
        }
      ]
    };
    var spy = sinon.spy(handyman, 'log');

    formatter(file);

    expect(spy).to.have.callCount(file.messages.length);

    handyman.log.restore();

  });

});