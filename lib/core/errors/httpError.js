/**
 * Created by braunreu on 12.07.15.
 */
'use strict';

/**
 * HttpError
 * Use HttpErrors if no predefined HttpError is available.
 *
 * @param name
 * @param message
 * @param statusCode
 * @param errorCode
 * @constructor
 */
function HttpError(name, message, statusCode, errorCode) {
    Error.captureStackTrace(this, this.constructor);

    this.name = name || 'Server Error';
    this.message = message || 'An error occured at the server. ' +
        'Please contact Alexander Braunreuther <a.braunreuther@ibalopo.de for further information.';
    this.statusCode = statusCode || 500;
    this.errorCode = errorCode || 500;
};

require('util').inherits(module.exports, Error);

module.exports = HttpError;
