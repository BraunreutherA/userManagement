/**
 * Created by braunreu on 12.07.15.
 */
'use strict';

module.exports = function internalServerError(message, errorCode) {

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name + ' Error';
  this.message = message || 'An internal server error occured.';
  this.statusCode = 500;
  this.errorCode = errorCode || 500;
};

require('util').inherits(module.exports, Error);
