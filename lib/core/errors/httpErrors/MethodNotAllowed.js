/**
 * Created by braunreu on 12.07.15.
 */
'use strict';

module.exports = function notFound(message, errorCode) {

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name + ' Error';
  this.message = message || 'This http method is not allowed on this resource.';
  this.statusCode = 405;
  this.errorCode = errorCode || 405;
};

require('util').inherits(module.exports, Error);
