/**
 * Created by braunreu on 12.07.15.
 */
'use strict';

module.exports = function notFound(message, errorCode) {

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name + ' Error';
  this.message = message || 'Not implemented yet.';
  this.statusCode = 501;
  this.errorCode = errorCode || 501;
};

require('util').inherits(module.exports, Error);
