/**
 * Created by braunreu on 12.07.15.
 */
'use strict';

module.exports = function notFound(message, errorCode) {

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name + ' Error';
  this.message = message || 'Not acceptable';
  this.statusCode = 406;
  this.errorCode = errorCode || 406;
};

require('util').inherits(module.exports, Error);
