/**
 * Created by braunreu on 20.08.15.
 */
'use strict';
var chai = require('chai');
var expect = require('chai').expect;
var chaiAsPromised = require('chai-as-promised');
var httpMocks = require('node-mocks-http');
var _ = require('lodash');

chai.use(chaiAsPromised);

var testUtil = require('../testUtil');

var requireParams = require('../../lib/middleware/requireParams/requireParams');
var middleWareInvocation = require('../../lib/middleware/requireParams/index');

describe('requireParams middleware', function () {
    it('should call next', function (done) {
        testUtil.ensureNext(middleWareInvocation(), done);
    });

    describe('required params', function () {
        it('should detect missing required params', function (done) {
            var injectedParams = {};
            var requiredParams = ['test'];

            return expect(requireParams(injectedParams, requiredParams)).to.be.rejected.and.notify(done);
        });

        it('should write checkedParams to the result', function (done) {
            var injectedParams = {test: '123'};
            var requiredParams = ['test'];

            return expect(requireParams(injectedParams, requiredParams)).to.be.eventually.deep.equals(injectedParams).and.notify(done);
        });

        it('should filter out unspecified params from the injected ones', function (done) {
            var injectedParams = {test: '123', anotherTest: '456'};
            var requiredParams = ['test'];

            return expect(requireParams(injectedParams, requiredParams)).to.be.eventually.deep.equals({test: '123'}).and.notify(done);
        });
    });

    describe('optional params', function () {
    });

    //describe('parameter validation', function () {
    //    it('should reject if the params don\'t match the validation schema', function (done) {
    //        var injectedParams = {test: 123, anotherTest: '456'};
    //        var requiredParams = [{test: 'string'}];
    //
    //        return expect(requireParams(injectedParams, requiredParams)).to.be.
    //            rejectedWith('The paramter - test - has to be a string').and.notify(done);
    //    });
    //});
});




