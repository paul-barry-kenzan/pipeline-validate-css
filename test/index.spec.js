/* global require */
'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var dirtyChai = require('dirty-chai');
var isStream = require('isstream');
var cssLint = require('gulp-csslint');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

var validateCSSPipeline = require('../src/index');

chai.use(sinonChai);
chai.use(dirtyChai);

describe('pipeline-validate-css', function () {
  var nodePath;

  before(function (done) {
    /*
     To mimic an environment in which this pipeline will be used,
     it's necessary to have a "node_modules/pipeline-validate-css/" directory with a .csslintrc file.
     To ensure this file exists, a simple stream is used to generate the file in
     the appropriate location.
     */

    var localPath = path.join(process.cwd());

    nodePath = path.join(process.cwd(), 'node_modules/pipeline-validate-css/');

    if (!fs.existsSync(nodePath)) {
      fs.mkdirSync(nodePath);
    }

    fs.createReadStream(localPath + '/.csslintrc')
      .pipe(fs.createWriteStream(nodePath + '/.csslintrc'))
      .on('finish', done);
  });

  after(function () {
    /*
     Delete temporary pipeline-validate-css directory after testing is complete.
     */
    if (fs.existsSync(nodePath)) {
      rimraf.sync(nodePath);
    }
  });

  describe('validateCSS Method', function () {

    it('should expose a validateCSS method', function () {
      expect(validateCSSPipeline.validateCSS).to.exist();
      expect(validateCSSPipeline.validateCSS).to.be.a('function');
    });

    it('should return a stream object', function () {
      expect(validateCSSPipeline.validateCSS()).to.be.an('object');
      expect(isStream(validateCSSPipeline.validateCSS())).to.be.true();
    });

    describe('validateCSS default usage', function () {

      xit('should utilize cssLint with no options', function () {
        var spy = sinon.spy(cssLint);

        validateCSSPipeline.validateCSS();

        expect(spy).to.have.been.calledWith(sinon.match.undefined);
      });

      it('should ensure that the custom output formatter is used', function () {
        var spy = sinon.spy(cssLint, 'formatter');

        validateCSSPipeline.validateCSS();

        expect(spy).to.have.been.calledWith(sinon.match.func);
      });

    });

    describe('validateCSS provided a custom options object', function () {

    });

    describe('validateCSS provided a custom .csslintrc path', function () {

    });

  });

});
