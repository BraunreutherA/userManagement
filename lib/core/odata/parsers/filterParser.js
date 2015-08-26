'use strict';
var BPromise = require('bluebird');

var utility = require('../../utility/utility');
var odataUtil = require('../../utility/utility');
var stringUtil = require('../../utility/stringUtil');
var httpErrors = require('../../errors/errors');


// Operator  Description             Example
// Comparison Operators
// eq        Equal                   Address/City eq 'Redmond'
// ne        Not equal               Address/City ne 'London'
// gt        Greater than            Price gt 20
// ge        Greater than or equal   Price ge 10
// lt        Less than               Price lt 20
// le        Less than or equal      Price le 100
// has       Has flags               Style has Sales.Color'Yellow'    #todo
// Logical Operators
// and       Logical and             Price le 200 and Price gt 3.5
// or        Logical or              Price le 3.5 or Price gt 200     #todo
// not       Logical negation        not endswith(Description,'milk') #todo

// eg.
//   http://host/service/Products?$filter=Price lt 10.00
//   http://host/service/Categories?$filter=Products/$count lt 10


function filterParser(query, $filter) {
    var promise = new BPromise(function (resolve, reject) {
        if (!$filter) {
            return resolve(query);
        }

        var SPLIT_MULTIPLE_CONDITIONS = /(.+?)(?:and(?=(?:[^']*'[^']*')*[^']*$)|$)/g;
        var SPLIT_KEY_OPERATOR_AND_VALUE = /(.+?)(?: (?=(?:[^']*'[^']*')*[^']*$)|$)/g;

        var condition;
        if (stringUtil.has($filter, 'and')) {
            condition = $filter.match(SPLIT_MULTIPLE_CONDITIONS).map(function (s) {
                return stringUtil.removeEndOf(s, 'and').trim();
            });
        } else {
            condition = [$filter.trim()];
        }

        for (var i = 0; i < condition.length; i++) {
            var item = condition[i];
            var conditionArr = item.match(SPLIT_KEY_OPERATOR_AND_VALUE).map(function (s) {
                return s.trim();
            }).filter(function (n) {
                return n;
            });
            if (conditionArr.length !== 3) {
                return reject(new httpErrors.BadRequest('Syntax error at \'#{item}\'.', 11));
            }

            var _conditionArr = utility.slicedToArray(conditionArr, 3);

            var key = _conditionArr[0];
            var odataOperator = _conditionArr[1];
            var value = _conditionArr[2];

            value = validator.formatValue(value);

            // handle query-functions
            var queryFunctions = ['indexof', 'year'];
            for (var _i = 0; _i < queryFunctions.length; _i++) {
                var queryFunction = queryFunctions[_i];
                if (key.indexOf('' + queryFunction + '(') === 0) {
                    odataUtil[queryFunction](query, key, odataOperator, value);
                    return resolve(query);
                }
            }

            switch (odataOperator) {
                case 'eq':
                    return resolve(query.where(key).equals(value));
                    break;
                case 'ne':
                    return resolve(query.where(key).ne(value));
                    break;
                case 'gt':
                    return resolve(query.where(key).gt(value));
                    break;
                case 'ge':
                    return resolve(query.where(key).gte(value));
                    break;
                case 'lt':
                    return resolve(query.where(key).lt(value));
                    break;
                case 'le':
                    return resolve(query.where(key).lte(value));
                    break;
                default:
                    return resolve(new httpErrors.badRequest('Incorrect operator at \'#{item}\'.', 12));
            }
        }
    });
    return promise;
}

var validator = {
    formatValue: function formatValue(value) {
        if (value === 'true') {
            return true;
        }
        if (value === 'false') {
            return false;
        }
        if (+value === +value) {
            return +value;
        }
        if (stringUtil.isBeginWith(value, '\'') && stringUtil.isEndWith(value, '\'')) {
            return value.slice(1, -1);
        }
        return new httpErrors.badRequest('Syntax error at \'' + value + '\'.', 13);
    }
};
module.exports = filterParser;
