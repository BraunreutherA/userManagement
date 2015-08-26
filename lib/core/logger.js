/**
 * Created by braunreu on 14.07.15.
 */
'use strict';
var config = require('./config');
var winston = require('winston');

/**
 * This is our standard logger transport.
 * It logs all levels to console.
 * @type {exports.Console}
 */
var transportConsole = new winston.transports.Console({
    json: false,
    timestamp: true,
    prettyPrint: true,
    colorize: true,
    level: 'info'
});

/**
 * This is the Debug level transport that logs to files.
 * We need it for production server to read easily if something is to debug
 * @type {exports.File}
 */
var transportFileDebug = new winston.transports.File({
    filename: config.debuglog,
    json: true
});
/**
 * This is the exception logger.
 * It only writes into file if an exception occur.
 * @type {exports.File}
 */
var transportFileException = new winston.transports.File({
    filename: config.exceptionlog,
    json: false
});

/**
 * Logger - used for all logging in the app.
 * Don' use console.log!
 * Has functionality for:
 * - informational logs
 * - warning logs
 * - error logs
 */
var logger = new (winston.Logger)({
    levels: {
        info: 0,
        warn: 1,
        error: 2
    },
    transports: [
        transportConsole,
        transportFileDebug
    ],
    exceptionHandlers: [
        transportFileException
    ],
    exitOnError: false
});

winston.addColors({
    info: 'cyan',
    warn: 'yellow',
    error: 'red'
});

module.exports = logger;
