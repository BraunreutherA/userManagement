/**
 * Created by braunreu on 27.07.15.
 */
'use strict';
var metadataParser = require('./metadata')('models.app');
var mongoose = require('mongoose');

module.exports = function (router) {
    router.get('/metadata', function (req, res) {
        res.status(200).send(metadataParser.getMetadata(mongoose.models));
    });
};
