/**
 * Created by braunreu on 16.07.15.
 */
'use strict';
var _ = require('lodash');
var BPromise = require('bluebird');

var parser = require('./parsers/parser');

/**
 * options sets the defaults.
 * - orderby: default ordering if no order is given.
 * - maxSkip: default value of maximal skipped objects.
 * - maxTop: default value for top
 * @param mongooseModel
 * @param options
 * @returns {Function}
 */
function MongooseQuery(mongooseModel, options, requestQuery) {
    this.query = mongooseModel.find();
    this.errors = [];

    this.topParser = parser.topParser(this.query, requestQuery.$top, options.maxTop);
    this.selectParser = parser.selectParser(this.query, requestQuery.$select);
    this.skipParser = parser.skipParser(this.query, requestQuery.$skip, options.maxSkip);
    this.orderbyParser = parser.orderbyParser(this.query, requestQuery.$orderby || options.orderby);
    this.filterParser = parser.filterParser(this.query, requestQuery.$filter);
    this.countParser = parser.countParser(this.query, requestQuery.$count);
}

MongooseQuery.prototype.exec = function () {
    var self = this;

    return BPromise.join(
        this.countParser,
        this.selectParser,
        this.filterParser,
        this.orderbyParser,
        this.skipParser,
        this.topParser,
        function (count) {
            if (count) {
                return count;
            }

            return self.query.exec();
        });
};

MongooseQuery.prototype.exclude = function (fields) {
    var self = this;
    _.forEach(fields, function (field) {
        self.query.select('-' + field);
    });
    return this.query;
};

module.exports = MongooseQuery;
