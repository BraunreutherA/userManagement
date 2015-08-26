/**
 * Created by braunreu on 12.07.15.
 */
'use strict';
var _ = require('lodash');

var errorStrings = [
    {errorCode: 1, errorMessage: 'You requested an endpoint that doesn\'t exist.'},

    //odata
    {errorCode: 10, errorMessage: '[Odata] Die angegebene $count Option ist nicht valide. ' +
    'Es werden nur true und false unterstützt.'},
    //todo: bessere error messages.
    {errorCode: 11, errorMessage: '[Odata] Syntax error at \'#{item}\'.'},
    {errorCode: 12, errorMessage: '[Odata] Incorrect operator at \'#{item}\'.'},
    {errorCode: 13, errorMessage: '[Odata] Syntax error at \'xxxxx\'.'},
    {errorCode: 14, errorMessage: '[Odata] Syntax error at \' $orderby \', ' +
    'it\'s should be like \'ReleaseDate asc, Rating desc\''}
];

function convertToErrorString(error) {
    var message = _(errorStrings)
        .filter(function (item) {
            return item.errorCode === error.errorCode;
        })
        .pluck('errorMessage')
        .value()
        .toString();


    if (message) {
        error.message = message;
        return error;
    } else {
        return error;
    }
}
module.exports.convertToErrorString = convertToErrorString;
