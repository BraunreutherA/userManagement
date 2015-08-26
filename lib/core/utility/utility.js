/**
 * Created by braunreu on 14.07.15.
 */
'use strict';
var path = require('path');

function slicedToArray(arr, i) {
    if (Array.isArray(arr)) {
        return arr;
    } else if (Symbol.iterator in Object(arr)) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e;
        try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i['return']) _i['return']();
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    } else {
        throw new TypeError('Invalid attempt to destructure non-iterable instance');
    }
}

function getFileExtension(fileName) {
    return '.' + fileName.substr((~-fileName.lastIndexOf('.') >>> 0) + 2);
}

module.exports = {
    rootPath: path.normalize(__dirname + '/..'),
    getFileExtension: getFileExtension,
    slicedToArray: slicedToArray
};
