/**
 * Created by braunreu on 16.08.15.
 */
'use strict';
var BPromise = require('bluebird');
var httpErrors = require('../core/errors/errors');

function streamHandler(req, res, next) {
    res.stream = function (stream, metaData) {
        toMimeType(metaData.extension)
            .then(function (mimeType) {
                stream.pipe(res);
                res.type(mimeType);
                res.status(200).send({statusCode: 200, message: '', data: ''});
            })
            .catch(next);
    };
    return next();
}

module.exports = streamHandler;

function toMimeType(extension) {
    var promise = new BPromise(function (resolve, reject) {
        switch (extension) {
            case 'pdf':
                return resolve('application/pdf');
            default:
                return reject(new httpErrors.internalServerError('Could not parse file extension to mime type.'));
        }
    });
    return promise;
}
