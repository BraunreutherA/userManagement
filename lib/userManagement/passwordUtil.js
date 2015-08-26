/**
 * Created by braunreu on 21.08.15.
 */
'use strict';
var BPromise = require('bluebird');
var bcrypt = require('bcrypt');

var logger = require('../core/logger');
var httpErrors = require('../core/errors/errors');

function hashPassword(password) {
    var promise = new BPromise(function (resolve, reject) {
        bcrypt.genSalt(10, function(error, salt) {
            if(error) {
                logger.error('[Usermanagement] Couldn\'t create salt for password hash: ', error);
                //todo: need error code area - maybe 200 - 299?
                return reject(new httpErrors.internalServerError('An error occured during the password encryption - ' +
                    'could\'t generate a salt.', 200));
            }
            bcrypt.hash(password, salt, function(error, hash) {
                if(error) {
                    logger.error('[Usermanagement] Couldn\'t hash password: ', error);
                    //todo: need error code area - maybe 200 - 299?
                    return reject(new httpErrors.internalServerError('An error occured during the password encryption', 201));
                }

                return resolve(hash);
            });
        });
    });
    return promise;
}

function verifyPassword(password, hashedPassword) {
    var promise = new BPromise(function (resolve, reject) {
        bcrypt.compare(password, hashedPassword, function(error, isValid) {
            if(error) {
                return reject(error);
            }

            if(!isValid) {
                return reject(new httpErrors.NotAuthorized('The password email combination is incorrect.', 208));
            } else {
                return resolve(isValid);
            }
        });
    });
    return promise;
}

module.exports = {
    hashPassword: hashPassword,
    verifyPassword: verifyPassword
};
