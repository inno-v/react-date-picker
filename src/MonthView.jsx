'use strict'

var React  = require('react')
var moment = require('moment')

var asConfig = require('./utils/asConfig')
var format   = require('./utils/format')

function formatMoment(moment, format){
    return moment.format(format)
}

var toMoment = require('./utils/toMoment')

var getWeekDayNames = require('./utils/getWeekDayNames')

var TODAY = formatMoment(moment().startOf("day"), "YYYY-MM-DD")

module.exports = React.createClass({

    displayName: 'MonthView',

    format: function(value, format){
        return this.formatMoment(this.toMoment(value), format)
    },

    formatMoment: function(moment, format){
        return formatMoment(moment, format || this.props.dateFormat)
    },

    toMoment: function(value, format, config){
        return toMoment(value, format || this.props.dateFormat, config || { strict: this.props.strictDateParse })
    },

    /**
     * Formats the given date in the specified format.
     * @method format
     *
     * @param  {Date/String/Moment} value
     * @param  {String} [format] If none specified, #dateFormat will be used
     *
     * @return {String}
     */

    formatAsDay: function(moment, dayDisplayFormat){
        return moment.format(dayDisplayFormat || 'D')
    },

    getDefaultProps: function() {

        return asConfig()
    },

    getWeekStartMoment: function(value){
        var clone = moment(value).startOf('week')

        // if (DEFAULT_WEEK_START_DAY != this.weekStartDay){
        //     clone.add('days', this.weekStartDay - DEFAULT_WEEK_START_DAY)
        // }

        return clone
    },

    getDaysForView: function(value){
        var first = moment(value).startOf('month')
        var start = this.getWeekStartMoment(first)
        var result = []
        var i = 0

        if (first.add(-1, 'days').isBefore(start)){
            //make sure the last day of prev month is included
            start.add(-1, 'weeks')
        }

        for (; i < 42; i++){
            result.push(moment(start))
            start.add(1, 'days')
        }

        return result
    },

    renderDay: function(date) {
        var dayMonth = this.format('M') * 1
        var dayText  = format.day(date)

        var classes = ["dp-cell"]

        if (date == TODAY){
            classes.push('dp-current')
        }

        return (
            <td className={classes.join(' ')}>
                {dayText}
            </td>
        )
    },

    render: function() {

        function renderDayName(day){

        }

        function renderDays(days){
            var nodes = days.map(this.renderDay, this)
            var len = days.length
            var buckets = []
            var bucketsLen = Math.ceil(len / 7)

            var i = 0

            for ( ; i < bucketsLen; i++){
                buckets.push(nodes.slice(i * 7, (i + 1) * 7))
            }


            return buckets.map(function(bucket){
                return <tr className="dp-week dp-row">{bucket}</tr>
            })
        }

        var date = moment(this.props.date)
        var daysInView = this.getDaysForView(date)
        var month = date.format('M')*1

        return (
            <table className="dp-table dp-month-view">
                <tbody>
                    {this.renderWeekDayNames()}

                    {renderDays.call(this, daysInView)}

                </tbody>
            </table>
        )
    },

    renderWeekDayNames: function(){
        var names = this.props.weekDayNames

        return (
            <tr className="dp-row dp-week-day-names">
                {names.map(name => <td key={name} className="dp-cell dp-week-day-name">{name}</td>)}
            </tr>
        )
    }

})