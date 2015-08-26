/**
 * Created by braunreu on 16.07.15.
 */
'use strict';
var utility = require('./utility');

function indexOf(query, key, odataOperator, value) {
    var target;

    var _key$substring$split = key.substring(key.indexOf('(') + 1, key.indexOf(')')).split(',');

    var _key$substring$split2 = utility._slicedToArray(_key$substring$split, 2);

    key = _key$substring$split2[0];
    target = _key$substring$split2[1];
    var _ref = [key.trim(), target.trim()];
    key = _ref[0];
    target = _ref[1];

    var operator = convertToOperator(odataOperator);
    query.$where('this.' + key + '.indexOf(' + target + ') ' + operator + ' ' + value);
}

// year(publish_date) eq 2000
function year(query, key, odataOperator, value) {
    key = key.substring(key.indexOf('(') + 1, key.indexOf(')'));

    var start = new Date(+value, 0, 1);
    var end = new Date(+value + 1, 0, 1);

    switch (odataOperator) {
        case 'eq':
            query.where(key).gte(start).lt(end);
            break;
        case 'ne':
            var condition = [{}, {}];
            condition[0][key] = {$lt: start};
            condition[1][key] = {$gte: end};
            query.or(condition);
            break;
        case 'gt':
            query.where(key).gte(end);
            break;
        case 'ge':
            query.where(key).gte(start);
            break;
        case 'lt':
            query.where(key).lt(start);
            break;
        case 'le':
            query.where(key).lt(end);
            break;
    }
}

function convertToOperator(odataOperator) {
    var operator;
    switch (odataOperator) {
        case 'eq':
            operator = '==';
            break;
        case 'ne':
            operator = '!=';
            break;
        case 'gt':
            operator = '>';
            break;
        case 'ge':
            operator = '>=';
            break;
        case 'lt':
            operator = '<';
            break;
        case 'le':
            operator = '<=';
            break;
    }
    return operator;
}

module.exports = {
    indexOf: indexOf,
    year: year
};
