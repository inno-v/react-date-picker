'use strict'

var React  = require('react')

var moment    = require('moment')
var copyUtils = require('copy-utils')
var copy     = copyUtils.copy
var copyList = copyUtils.copyList

var asConfig = require('./utils/asConfig')

var MonthView  = require('./MonthView')
var YearView   = require('./YearView')
var DecadeView = require('./DecadeView')

var Views = {
    month : MonthView,
    year  : YearView,
    decade: DecadeView
}

var getWeekDayNames = require('./utils/getWeekDayNames')

function emptyFn(){}

var DatePicker = React.createClass({

    displayName: 'DatePicker',

    getInitialState: function() {
        return {
        }
    },

    getDefaultProps: function() {
        return asConfig()
    },

    getViewName: function() {
        return this.state.view || this.props.view || 'month'
    },

    getViewOrder: function() {
        return ['month', 'year', 'decade']
    },

    addViewIndex: function(amount) {
        var viewName = this.getViewName()

        var order = this.getViewOrder()
        var index = order.indexOf(viewName)

        index += amount

        return index % order.length
    },

    getNextViewName: function() {
        return this.getViewOrder()[this.addViewIndex(1)]
    },

    getPrevViewName: function() {
        return this.getViewOrder()[this.addViewIndex(-1)]
    },

    getView: function() {
        return Views[this.getViewName()] || Views.month
    },

    getViewDate: function() {
        return this.state.viewMoment || this.props.viewDate || this.props.date || this.now
    },

    render: function() {

        this.now = +new Date()

        var view     = this.getView()
        var props    = asConfig(this.props)

        props.viewDate = this.getViewDate()
        props.onChange = this.handleChange
        props.onSelect = this.handleSelect

        // console.log('value',moment(this.props.value).format('YYYY MM DD'))

        return React.DOM.div(copy({
            className: (this.props.className || '') + ' date-picker'
        }, this.props),
            <div className="dp-inner">
                {this.renderHeader(view)}

                <div className="dp-body">
                    <div className="dp-anim-target">
                    {view(props)}
                    </div>
                </div>

                {this.renderFooter()}
            </div>
        )
    },

    renderFooter: function() {
        var todayText = this.props.today || 'Today'
        var gotoSelected = this.props.gotoSelected || 'Go to selected'

        return (
            <div className="dp-footer">
                <div className="dp-footer-today" onClick={this.gotoNow}>
                    {todayText}
                </div>
                <div className="dp-footer-selected" onClick={this.gotoSelected}>
                    {gotoSelected}
                </div>
            </div>
        )
    },

    gotoNow: function() {
        this.gotoDate(+new Date())
    },

    gotoSelected: function() {
        this.gotoDate(this.props.date || +new Date())
    },

    gotoDate: function(value) {
        this.setState({
            view: 'month',
            viewMoment: moment(value)
        })
    },

    getViewColspan: function(){
        var map = {
            month : 5,
            year  : 2,
            decade: 2
        }

        return map[this.getViewName()]
    },

    renderHeader: function(view) {

        var viewDate   = this.getViewDate()
        var headerText = this.getView().getHeaderText(viewDate)

        var colspan = this.getViewColspan()
        var prev    = this.props.navPrev
        var next    = this.props.navNext

        return (
            <div className="dp-header">
                <table className="dp-nav-table"><tbody>
                    <tr className="dp-row">
                        <td  className="dp-prev-nav dp-nav-cell dp-cell" onClick={this.handlePrevNav}>{prev}</td>

                        <td className="dp-nav-view dp-cell " colSpan={colspan} onClick={this.handleViewChange}>{headerText}</td>

                        <td className="dp-next-nav dp-nav-cell dp-cell" onClick={this.handleNextNav}>{next}</td>
                    </tr>
                </tbody></table>
            </div>
        )
    },

    handleViewChange: function() {
        this.setState({
            view: this.getNextViewName()
        })
    },

    getNext: function() {
        var current = this.getViewDate()

        return ({
            month: function() {
                return moment(current).add(1, 'month')
            },
            year: function() {
                return moment(current).add(1, 'year')
            },
            decade: function() {
                return moment(current).add(10, 'year')
            }
        })[this.getViewName()]()
    },

    getPrev: function() {
        var current = this.getViewDate()

        return ({
            month: function() {
                return moment(current).add(-1, 'month')
            },
            year: function() {
                return moment(current).add(-1, 'year')
            },
            decade: function() {
                return moment(current).add(-10, 'year')
            }
        })[this.getViewName()]()
    },

    handlePrevNav: function(event) {
        ;(this.props.onNav || emptyFn)(event)

        this.setState({
            viewMoment: this.getPrev()
        })
    },

    handleNextNav: function(event) {
        ;(this.props.onNav || emptyFn)(event)

        this.setState({
            viewMoment: this.getNext()
        })
    },

    handleChange: function(date, event) {
        ;(this.props.onChange || emptyFn)(moment(date), event)
    },

    handleSelect: function(date, event) {
        var viewName = this.getViewName()
        var property = ({
            decade: 'year',
            year  : 'month'
        })[viewName]

        var value = date.get(property)
        var viewMoment = moment(this.getViewDate()).set(property, value)

        this.setState({
            viewMoment: viewMoment,
            view: this.getPrevViewName()
        })

        ;(this.props.onSelect || emptyFn)(moment(viewMoment), event)
    }

})

module.exports = DatePicker