'use strict'

require('./index.styl')

var React = require('react')
var moment = require('moment')

var DatePicker = require('./src/index')

var DATE = Date.now() - 1000*60*60*24 * 200
var VALUE

var App = React.createClass({

    displayName: 'App',

    render: function(){
        console.log(moment(DATE).format('YYYY MM DD'))
        var v = VALUE || Date.now()
        return <div style={{margin: 10}}>
            <DatePicker minDate='2014-04-04' maxDate='2014-10-10' date={v} viewDate={DATE} onChange={this.onChange}/></div>
    },

    onChange: function(date) {
        DATE = date
        VALUE = date
        this.setState({})
    }
})

React.renderComponent(<App />, document.getElementById('content'))