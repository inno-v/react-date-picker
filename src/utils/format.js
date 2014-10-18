'use strict'

var moment = require('moment')
var CONFIG = require('../config')

function f(mom, format){
    return mom.format(format)
}

module.exports = {
    day: function(mom, format) {
        return f(mom, format || CONFIG.dayFormat)
    },

    month: function(mom, format) {
        return f(mom, format || CONFIG.monthFormat)
    },

    year: function(mom, format) {
        return f(mom, format || CONFIG.yearFormat)
    }
}