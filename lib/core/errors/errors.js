/**
 * Created by braunreu on 12.07.15.
 */
'use strict';
var fs = require('fs');
var errors = fs.readdirSync(__dirname + '/httpErrors');

errors.forEach(function (el) {

    var n = el.substring(0, el.indexOf('.'));

    module.exports[n] = require('./httpErrors/' + el);

});

/**
 * Turns errors from mongoose into httpErrors that can get handled by the generic error handler.
 *
 * @param error
 * @returns {*}
 */
function convertToHttpError(error) {
    if (error.statusCode) {
        return BPromise.reject(error);
    }

    return BPromise.reject(new httpErrors.internalServerError('An error occured on updating the poll.', 40));
}

module.exports.convertToHttpError = convertToHttpError;
