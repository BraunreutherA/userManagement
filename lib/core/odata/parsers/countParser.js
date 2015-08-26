'use strict';
var BPromise = require('bluebird');

var httpErrors = require('../../errors/errors');

function countParser(query, $count) {
    var promise = new BPromise(function (resolve, reject) {

        if (!$count) {
            return resolve();
        }

        if($count === 'false') {
            return resolve();
        }

        if ($count === 'true') {
            query.count(function (error, count) {
                if(error) {
                    return reject(new httpErrors.InternalServerError(error.message, null));
                }

                return resolve(count);
            });
        } else {
            return reject(new httpErrors.BadRequest('Unknown $count option, only "true" and "false" are supported.', 10));
        }
    });
    return promise;
}

module.exports = countParser;
