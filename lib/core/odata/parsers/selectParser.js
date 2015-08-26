'use strict';
var BPromise = require('bluebird');

function selectParser(query, $select) {
    var promise = new BPromise(function (resolve, reject) {
        if (!$select) {
            return resolve(query);
        }

        var list = $select.split(',');
        for (var i = 0; i < list.length; i++) {
            list[i] = list[i].trim();
        }

        var selectFields = {_id: 0};
        Object.keys(query.model.schema.tree).map(function (item) {
            if (list.indexOf(item) >= 0) {
                if (item === 'id') {
                    item = '_id';
                }
                selectFields[item] = 1;
            }
        });

        return resolve(query.select(selectFields));
    });
    return promise;
}

module.exports = selectParser;
