/**
 * Created by braunreu on 22.08.15.
 */
'use strict';
var BPromise = require('bluebird');
var jwt = require('jsonwebtoken');

var config = require('../core/config');

var logger = require('../core/logger');
var httpErrors = require('../core/errors/errors');

function createRegistrationToken(user) {
    var options = {
        /** the registration token is valid for two days.
         *  later on it won't be valid anymore and the user has to start a new registration atempt.
         */
        expiresInMinutes: 2880
    };
    return jwt.sign(user, config.auth.registrationTokenSecret, options);
}

function createAuthToken(user) {
    var options = {
        /** the registration token is valid for two days.
         *  later on it won't be valid anymore and the user has to start a new registration atempt.
         */
        expiresInMinutes: 2880
    };
    return jwt.sign(user._id, config.auth.authTokenSecret, options);
}

function createPasswordResetToken(email) {
    var options = {
        /** the registration token is valid for two days.
         *  later on it won't be valid anymore and the user has to start a new registration atempt.
         */
        expiresInMinutes: 2880
    };
    return jwt.sign(email, config.auth.passwordResetSecret, options);
}

/**
 * This is a wrapper for the jwt library verify function.
 *
 * @returns {BPromise}
 */
function verifyToken(token) {
    var promise = new BPromise(function (resolve, reject) {
        jwt.verify(token, config.auth.registrationTokenSecret, function (error, decoded) {
            if(error) {
                if (error.name === 'TokenExpiredError') {
                    return reject(new httpErrors.NotAuthorized('The token expired. Please register again and get a new token.', 202));
                } else {
                    logger.error('[Authorization] An invalid token was provided. This was the error: ' + error);
                    return reject(new httpErrors.NotAuthorized('The token is invalid. Please provide a valid token.', 203));
                }
            }

            return resolve(decoded);
        });
    });

    return promise;
}

module.exports = {
    createAuthToken: createAuthToken,
    createRegistrationToken: createRegistrationToken,
    createPasswordResetToken: createPasswordResetToken,
    verifyToken: verifyToken
};
