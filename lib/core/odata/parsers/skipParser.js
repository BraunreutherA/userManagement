'use strict';
var _ = require('lodash');
var BPromise = require('bluebird');

var httpErrors = require('../../errors/errors');

function skipParser(query, $skip, maxSkip) {
    var promise = new BPromise(function (resolve, reject) {
        if (!$skip) {
            $skip = 0;
        }

        if (!maxSkip) {
            maxSkip = 0;
        }

        if (isNaN($skip)) {
            return resolve(query);
        }
        $skip = _.min([maxSkip, $skip]);
        if ($skip < 0) {
            return reject(new httpErrors.BadRequest('You specified a skip value < 0. That\'s not valid.'));
        }
        return resolve(query.skip($skip));
    });
    return promise;
}

module.exports = skipParser;
