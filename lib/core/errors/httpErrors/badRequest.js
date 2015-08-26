/**
 * Created by braunreu on 12.07.15.
 */
'use strict';

module.exports = function badRequest(message, errorCode) {

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name + ' Error';
  this.message = message || 'Bad request';
  this.statusCode = 400;
  this.errorCode = errorCode || 400;
};

require('util').inherits(module.exports, Error);
