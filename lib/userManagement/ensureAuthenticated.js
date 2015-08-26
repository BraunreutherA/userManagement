/**
 * Created by braunreu on 22.08.15.
 */
'use strict';
var tokenUtil = require('./tokenUtil');

var User = require('./models/User');

function ensureAuthenticated(token) {
    return tokenUtil.verifyToken(token)
        .then(function (decodedToken) {
            return User.findOne({id: decodedToken.id})
        });
}

//todo: Put this into middle ware and export the ensureAuthenticated function for testing
//todo: what to do with user roles?
module.exports = function (req, res, next) {
    if (!req.headers['authorization']) {
        return next(new httpErrors.badRequest('[Auth] No authorization header.', 206));
    }

    var token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return next(new httpErrors.badRequest('[Auth] Invalid authorization header.', 207));
    }

    ensureAuthenticated(token)
        .then(function (user) {
            req.user = user;
            next();
        })
        .catch(next);
};
