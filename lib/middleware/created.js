/**
 * Created by braunreu on 14.08.15.
 */
'use strict';
function createdHandler(req, res, next) {
    res.created = function (resource, data) {
        res.status(201).send({statusCode: 201, message: resource + ' created.', data: data});
    };
    return next();
}

module.exports = createdHandler;
