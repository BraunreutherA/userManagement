/**
 * Created by braunreu on 14.07.15.
 */
'use strict';
var expect = require('chai').expect;

var errorDictionary = require('../../lib/core/errors/dictionary');
var httpError = require('../../lib/core/errors/httpError');

describe('converting an errorCode to a errorMessage', function () {
    it('should convert the code 1 to "You requested an endpoint that doesn\'t exist."', function (done) {
        var error = new httpError('TestError', 'test message', 500, 1);
        var errorResult = errorDictionary.convertToErrorString(error);
        expect(errorResult.message).to.be.equal('You requested an endpoint that doesn\'t exist.');

        done();
    });
});
