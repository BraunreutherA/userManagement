'use strict';
var _ = require('lodash');
var BPromise = require('bluebird');

var httpErrors = require('../../errors/errors');

function topParser(query, $top, maxTop) {
    var promise = new BPromise(function (resolve, reject) {
        if (!$top) {
            $top = 0;
        }

        if (!maxTop) {
            maxTop = 10000;
        }

        if (isNaN($top)) {
            return reject(new httpErrors.BadRequest('You specified not a number for $top. That\'s not valid.'));
        }
        $top = _.min([maxTop, $top]);
        if ($top < 0) {
            return reject(new httpErrors.BadRequest('You specified a value < 0 for $top. That\'s not valid.'));
        }
        return resolve(query.limit($top));
    });

    return promise;
}

module.exports = topParser;
