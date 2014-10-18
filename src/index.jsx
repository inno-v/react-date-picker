'use strict'

var React  = require('react')

var moment    = require('moment')
var copyUtils = require('copy-utils')
var copy     = copyUtils.copy
var copyList = copyUtils.copyList

var asConfig = require('./utils/asConfig')

var MonthView = require('./MonthView')
var YearView
var DecadeView

var Views = {
    month : MonthView,
    year  : YearView,
    decade: DecadeView
}

var getWeekDayNames = require('./utils/getWeekDayNames')

var DatePicker = React.createClass({

    displayName: 'DatePicker',


    getDefaultProps: function() {
        return asConfig()
    },

    render: function() {

        var view = Views[this.props.view] || Views.month

        return <div className="date-picker" style={{width: 400, border: '1px solid red', height: 400}}>
            <div className="dp-inner">
                {this.renderHeader(view)}

                <div className="dp-body">
                    <div className="dp-anim-target">
                    {view(asConfig(this.props))}
                    </div>
                </div>
            </div>
        </div>
    },

    getViewColspan: function(){
        var map = {
            month : 5,
            year  : 2,
            decade: 2
        }

        return map[this.props.view] || map.month
    },

    renderHeader: function(view) {

        var colspan = this.getViewColspan()
        var prev    = this.props.navPrev
        var next    = this.props.navNext

        return (
            <div className="dp-header">
                <table className="dp-nav-table"><tbody>
                    <tr className="dp-row">
                        <td  className="dp-prev-nav dp-nav-cell dp-cell">{prev}</td>

                        <td className="dp-nav-view dp-cell " colSpan={colspan}>Current month</td>

                        <td className="dp-next-nav dp-nav-cell dp-cell">{next}</td>
                    </tr>
                </tbody></table>
            </div>
        )
    }

})

module.exports = DatePicker