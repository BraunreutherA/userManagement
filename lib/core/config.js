/**
 * Created by braunreu on 01.06.15.
 */
'use strict';
var path = require('path');
var extend = require('util')._extend;
var argv = require('yargs').argv;
var utility = require('./utility/utility');

var development = require('../../config/environment/development');
var production = require('../../config/environment/production');

var defaults = {
    verbose: !!argv.verbose || false,
    port: process.env.PORT || argv.port || 9000,
    debuglog: argv.debuglog ? path.join(utility.rootPath, argv.debuglog) : path.join(utility.rootPath, 'log/debug.log'),
    exceptionlog: argv.exceptionlog ? path.join(utility.rootPath, argv.exceptionlog) : path.join(utility.rootPath, 'log/exception.log'),

    /**
     * todo: use nodemailer or give option to use own mailer.
     */
    mailer: {
        apiKey: 'xxx',
        from: {
            name: 'xxx',
            email: 'xxx'
        },
        website: 'xxx'
    },

    auth: {
        authTokenSecret: argv.tokenSecret || 'xxx',
        registrationTokenSecret: argv.registrationTokenSecret || 'xxx',
        passwordResetSecret: argv.passwordResetSecret || 'xxx'
    }
};

/**
 * Gives back the configuration based on the specified environment.
 * If no environment is set, the dev is taken.
 */
module.exports = {
    development: extend(development, defaults),
    production: extend(production, defaults)
    //todo: maybe use a local option as standard and reject it from git.
}[process.env.NODE_ENV || 'development'];
