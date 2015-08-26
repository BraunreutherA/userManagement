'use strict';
var BPromise = require('bluebird');

var httpErrors = require('../../errors/errors');

function orderbyParser(query, $orderby) {
    var promise = new BPromise(function (resolve, reject) {
        if (!$orderby) {
            return resolve(query);
        }

        var order = {};
        var orderbyArr = $orderby.split(',');

        orderbyArr.map(function (item) {
            var data = item.trim().split(' ');
            if (data.length > 2) {
                return reject(new httpErrors.badRequest('Syntax error at \'' + $orderby + '\', ' +
                    'it\'s should be like \'ReleaseDate asc, Rating desc\'', 14));
            }
            var key = data[0].trim();
            var value = data[1] || 'asc';
            order[key] = value;
        });
        return resolve(query.sort(order));
    });
    return promise;
}

module.exports = orderbyParser;
