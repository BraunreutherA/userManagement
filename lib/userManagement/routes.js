/**
 * Created by braunreu on 21.08.15.
 */
'use strict';
var BPromise = require('bluebird');
var _ = require('lodash');

var requireParams = require('../middleware/requireParams');
var authController = require('./auth.controller');

//var ensureAuthenticated = require('./ensureAuthenticated');

var User = require('./models/User');

module.exports = function (router) {
    router.post('/register', requireParams(['email', 'userName', 'password']), authController.register);
    router.get('/register/:token', authController.verifyRegistration);

    router.post('/login', requireParams(['email', 'password']), authController.login);

    router.post('/passwordreset', requireParams(['email']), authController.passwordReset);
    router.post('/passwordreset/:token', requireParams(['password']), authController.verifyPasswordReset);

    //router.route('/user')
    //    .get(function(req, res, next) {
    //        next('not implemented yet..');
    //    })
    //    .put(ensureAuthenticated, requireParams([], ['username', 'age']), function (req, res, next) {
    //        console.log(req.user);
    //        req.user.update(req.checkedParams)
    //            .then(function (user) {
    //                res.success('User updated.', user);
    //            })
    //            .catch(next);
    //    });
};

/** todos:
 *      - password update
 *      - password reset per token
 *      - email update -> neue email verifizieren.
 *      - email versand
 */
