/**
 * Created by braunreu on 21.08.15.
 */
'use strict';
var chai = require('chai');
var expect = require('chai').expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var passwordUtil = require('../../lib/userManagement/passwordUtil');

describe('password utility', function () {
    it('password mustn\'t be equal as hashed password', function (done) {
        expect(passwordUtil.hashPassword('password')).not.to.be.eventually.equals('password').and.notify(done);
    });
});
