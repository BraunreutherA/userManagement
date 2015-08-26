/**
 * Created by braunreu on 12.07.15.
 */
'use strict';

module.exports = function notFound(message, errorCode) {

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name + ' Error';
  this.message = message || 'Not authorized.';
  this.statusCode = 401;
  this.errorCode = errorCode || 401;
};

require('util').inherits(module.exports, Error);
