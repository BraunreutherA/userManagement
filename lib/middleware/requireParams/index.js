/**
 * Created by braunreu on 20.08.15.
 */
'use strict';
var _ = require('lodash');
var requireParams = require('./requireParams');

module.exports  = function (requiredParams, optionalParams) {
    return function (req, res, next) {
        // todo: really query here?
        var params = _.assign(req.body, req.params, req.query);
        requireParams(params, requiredParams, optionalParams)
            .then(function(checkedParams) {
                req.checkedParams = checkedParams;
                next();
            })
            .catch(function(error) {
                console.log(error);
            });
    }
};
