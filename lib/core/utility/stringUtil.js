/**
 * Created by braunreu on 16.07.15.
 */
'use strict';
module.exports = {
    has: has,
    isBeginWith: isBeginWith,
    isEndWith: isEndWith,
    removeEndOf: removeEndOf
};

function has(str, key) {
    return str.indexOf(key) >= 0;
}

function isBeginWith(str, key) {
    return str.indexOf(key) === 0;
}

function isEndWith(str, key) {
    return str.lastIndexOf(key) === str.length - key.length;
}

function removeEndOf(str, key) {
    if (isEndWith(str, key)) {
        return str.substr(0, str.length - key.length);
    }
    return str;
}
