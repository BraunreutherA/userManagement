/**
 * Created by braunreu on 22.08.15.
 */
'use strict';
var BPromise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var httpErrors = require('../../core/errors/errors');

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }
});

userSchema.statics.register = function (registrationData) {
    var self = this;

    var promise = new BPromise(function (resolve, reject) {
        return self.findOne({email: registrationData.email}, function (error, user) {
            if (error) {
                return reject(error);
            }

            if (user) {
                return reject(new httpErrors.badRequest('There is already an existing account with this email address.', 204));
            } else {
                return resolve(self.create(registrationData));
            }
        });
    });
    return promise;
};

var User = mongoose.model('User', userSchema);

module.exports = User;
