/**
 * Created by braunreu on 12.07.15.
 */
'use strict';

module.exports = function notFound(message, errorCode) {

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name + ' Error';
  this.message = message || 'The requested resource couldn\'t be found';
  this.statusCode = 404;
  this.errorCode = errorCode || 404;
};

require('util').inherits(module.exports, Error);
