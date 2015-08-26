/**
 * Created by braunreu on 14.08.15.
 */
'use strict';
function successHandler(req, res, next) {
    res.success = function (message, data) {
        res.status(200).send({statusCode: 200, message: message, data: data});
    };
    return next();
}

module.exports = successHandler;
