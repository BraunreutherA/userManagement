/**
 * Created by braunreu on 23.08.15.
 */
'use strict';
var BPromise = require('bluebird');
var _ = require('lodash');

var User = require('./models/User');

var passwordUtil = require('./passwordUtil');
var tokenUtil = require('./tokenUtil');

function register(req, res, next) {
    var registrationData = req.checkedParams;

    passwordUtil.hashPassword(registrationData.password)
        .then(function (hashedPassword) {
            registrationData.password = hashedPassword;
            return tokenUtil.createRegistrationToken(registrationData);
        })
        .then(function (registrationToken) {
            //todo: send this token via email to the user that registrered. For now we just send it back.
            res.created('registrationToken', registrationToken);
        })
        .catch(next);
}

function verifyRegistration(req, res, next) {
    tokenUtil.verifyToken(req.params.token)
        .then(function (decodedToken) {
            return _.pick(decodedToken, ['userName', 'email', 'password']);
        })
        //todo: create user in database
        .then(function (registrationData) {
            return User.register(registrationData);
        })
        .then(function (createdUser) {
            res.created('User', {user: createdUser, token: tokenUtil.createAuthToken(createdUser)});
        })
        .catch(next);
}

function login(req, res, next) {
    return User.findOne({email: req.checkedParams.email})
        .then(function (user) {
            if (!user) {
                return next(new httpErrors.badRequest('Could\'t find user for the given email address.', 210));
            }

            return BPromise.props({
                isValid: passwordUtil.verifyPassword(req.checkedParams.password, user.password),
                user: user
            });
        })
        .then(function (result) {
            return res.success('Login successful.', {user: result.user, token: tokenUtil.createAuthToken(result.user)});
        })
        .then(null, next);
}

module.exports = {
    register: register,
    verifyRegistration: verifyRegistration,
    login: login
};
