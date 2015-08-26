/**
 * Created by braunreu on 20.08.15.
 */
'use strict';
var httpMocks = require('node-mocks-http');

/**
 * This is a testhelper for middleware.
 * It ensures, next() is called on the middleware function.
 * @param middleware - the middlewarefuntion unit.
 * @param done - the done function from mocha.
 */
function ensureNext(middleware, done) {
    var request  = httpMocks.createRequest();
    var response = httpMocks.createResponse();

    middleware(request, response, function() {
        done();
    });
}

module.exports = {
    ensureNext: ensureNext
};
