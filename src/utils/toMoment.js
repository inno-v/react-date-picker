'use strict'

var moment = require('moment')

/**
 * This function will be used to convert a date to a moment.
 *
 * It accepts input as sring, date or moment
 *
 * @param  {String/Date/Moment} value
 * @param  {String} dateFormat if value is string, it will be parsed to a moment using this format
 * @param  {Object} config
 * @param  {Boolean} config.strict whether to perform strict parsing on strings
 * @return {Moment}
 */
module.exports = function(value, dateFormat, config){
    var strict = !!(config && config.strict)

    if (typeof value == 'string'){
        return moment(value, dateFormat, strict)
    }

    return moment(value == null? new Date(): value)
}