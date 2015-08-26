/**
 * Created by braunreu on 16.07.15.
 */
'use strict';
var mongoose = require('mongoose');
var BPromise = require('bluebird');

var config = require('./config');
var logger = require('./logger');

function init() {
    var promise = new BPromise(function (resolve, reject) {
        mongoose.connect(config.db.mongoDb.url);

        var connection = mongoose.connection;
        connection.on('error', function (error) {
            logger.error('Couldn\'t connect to mongoDb. This was ther error: ' + error);
            return reject(error);
        });
        connection.once('open', function () {
            logger.info('Connected succesfully to mongoDb');
            return resolve(connection);
        });
    });
    return promise;
}

module.exports = {
    init: init
};
