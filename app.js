/**
 * Created by braunreu on 14.07.15.
 */
'use strict';
//require('newrelic');

var BPromise = require('bluebird');
var _ = require('lodash');

var express = require('express');
var app = express();

var config = require('./lib/core/config');
var errors = require('./lib/core/errors/errors');
var logger = require('./lib/core/logger');

var initializationHandler = require('./lib/core/initializationHandler');
initializationHandler.initMiddleware(app)
    .then(function(message) {
        logger.info(message);
        return initializationHandler.initRoutes(app)
    })
    .then(function (message) {
        logger.info(message);
        return initializationHandler.initDatabase();
    })
    .then(function (database) {
        logger.info('Database initialized!');
        return initializationHandler.initErrorHandler(app);
    })
    .then(function(message) {
        logger.info(message);

        app.listen(config.port);
        logger.info('##########################');
        logger.info('Application started');
        logger.info('It listens on port: ', config.port);
        //todo: a verbose flag would be nice. Maybe implement it directly into th logger -> logger.verbose('test');
        logger.info('This is the specified config: ', config);
        logger.info('##########################');
    })
    .catch(function (error) {
       logger.error(error);
    });
