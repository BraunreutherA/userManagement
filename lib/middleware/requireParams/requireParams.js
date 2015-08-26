/**
 * Created by braunreu on 14.07.15.
 */
var valib = require('valib');
var _ = require('lodash');
var BPromise = require('bluebird');
var httpErrors = require('../../core/errors/errors');

function requireParams(params, requiredParams, optionalParams) {
    return BPromise.join(checkRequiredParams(params, requiredParams), checkOptionalParams(params, optionalParams),
        function (checkedRequiredParams, checkedOptionalParams) {
            return _.assign(checkedRequiredParams, checkedOptionalParams);
        });
}

function checkVal(value) {
    return !valib.Type.isNull(value) && !valib.Type.isUndefined(value);
}

function checkParam(params, key) {
    if (params && checkVal(params[key])) {
        return params[key];
    }
}

function checkOptionalParams(params, optionalParams) {
    var promise = new BPromise(function (resolve, reject) {
        var checkedParams = {};

        _.forEach(optionalParams, function (key) {
            checkParam(params, key)
                .then(function (param) {
                    checkedParams[key] = param
                });
        });

        return resolve(checkedParams);
    });
    return promise;
}

function checkRequiredParams(params, requiredParams) {
    var promise = new BPromise(function (resolve, reject) {
        var checkedParams = {};
        var message = '';


        // todo: is this already async? Otherwise this can be faster.
        _.forEach(requiredParams, function (key) {
            if(checkParam(params, key)) {
                checkedParams[key] = checkParam(params, key);
            } else {
                message += 'The parameter - ' + key + ' - is required but missing.\n';
            }
        });


        if (!valib.String.isEmpty(message)) {
            // todo: insert a good errorCode - need an error code area for middleware. Eventually 100 - 199
            return reject(new httpErrors.badRequest(message, 100));
        }

        return resolve(checkedParams);
    });
    return promise;
}

module.exports = requireParams;

