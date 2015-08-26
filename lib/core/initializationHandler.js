/**
 * Created by braunreu on 10.08.15.
 */
'use strict';
var BPromise = require('bluebird');
var express = require('express');

var bodyParser = require('body-parser');
var cors = require('cors');

var successHandler = require('../middleware/success');
var streamHandler = require('../middleware/stream');
var createdHandler = require('../middleware/created');

var errorHandler = require('../middleware/errorHandler');


var httpErrors = require('./errors/errors');
var database = require('./mongoDb');
/**
 * Registering necessary 3rd party middleware.
 *
 * @param app
 * @returns {bluebird|exports|module.exports}
 */
function initMiddleware(app) {
    var promise = new BPromise(function (resolve, reject) {
        app.use(successHandler);
        app.use(streamHandler);
        app.use(createdHandler);

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        app.use(cors());

        return resolve('3rd Party middleware is registered to the app.');
    });
    return promise;
}

/**
 * Inits the database and returns a promise with the connection object.
 *
 * @returns {*}
 */
function initDatabase() {
    return database.init();
}

/**
 * Initializes all routes for the app.
 * Prepends /api/v1 to the routes.
 * Sets up a 404 not found route for all requests, that don't match other routes.
 *
 * @param app
 * @returns {bluebird|exports|module.exports}
 */
function initRoutes(app) {
    var promise = new BPromise(function (resolve, reject) {
        var mainRouter = express.Router();
        app.use('/api/v1', mainRouter);

        require('../serverStatus/routes')(mainRouter);
        require('../userManagement/routes')(mainRouter);

        app.all('*', function (req, res, next) {
            next(new httpErrors.NotFound('Endpoint not existant.', 1));
        });

        return resolve('All routes are set up.');
    });
    return promise;
}

/**
 * Initializes the app errorhandler.
 *
 * @param app
 * @returns {bluebird|exports|module.exports}
 */
function initErrorHandler(app) {
    var promise = new BPromise(function(resolve, reject) {
        app.use(errorHandler);
        return resolve('Error handler is set up.');
    });
    return promise;
}

var service = {
    initMiddleware: initMiddleware,
    initRoutes: initRoutes,
    initErrorHandler: initErrorHandler,
    initDatabase: initDatabase
};

module.exports = service;
