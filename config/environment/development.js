/**
 * Created by braunreu on 01.06.15.
 */
'use strict';
module.exports = {
    db: {
        mongoDb: {
            url: 'mongodb://localhost:27017/userManagement'
        },
        // todo: will redis be needed? - Just use jwts.
        redis: {
            host: 'redis',
            port: 5000
        }
    }
};
