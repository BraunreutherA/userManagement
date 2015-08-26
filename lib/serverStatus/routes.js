/**
 * Created by braunreu on 27.07.15.
 */
'use strict';
module.exports = function (router) {
    router.get('/serverStatus', function (req, res) {
        res.status(200).send({statusCode: 200, message: 'Server is alive.', data: ''});
    });
};
