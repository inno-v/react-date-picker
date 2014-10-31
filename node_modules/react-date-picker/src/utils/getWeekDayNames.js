'use strict'

var moment = require('moment')

var DEFAULT_WEEK_START_DAY = moment().startOf('week').format('d') * 1

module.exports = function getWeekDayNames(startDay){

    var names = moment.weekdaysShort()

    if (startDay !== undefined && DEFAULT_WEEK_START_DAY != startDay){
        var index = startDay

        while (index > DEFAULT_WEEK_START_DAY){
            names.push(names.shift())
            index--
        }
    }

    return names
}