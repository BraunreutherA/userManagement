/**
 * Created by braunreu on 12.07.15.
 */
'use strict';
var _ = require('lodash');
var logger = require('../core/logger');
var errorDictionary = require('../core/errors/dictionary');

var httpErrors = require('../core/errors/errors');

/**
 * Produces proper error codes for the end user and logs the Error.
 * The stacktrace only gets logged for 5xx errors.
 * All other errors are intended so we don't need a stacktrace.
 *
 * @param error
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function errorHandler(error, req, res, next) {
    if (!error.statusCode) {
        error = new httpErrors.internalServerError(error.message);
    }

    if (error.statusCode - 500 >= 0) {
        logger.error(error);
    } else {
        logger.error(error.message);
    }

    var errorResult = _.assign(errorDictionary.convertToErrorString(error));

    return res.status(errorResult.statusCode).send(errorResult);
}

module.exports = errorHandler;
