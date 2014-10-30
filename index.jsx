'use strict'

require('./index.styl')

var React      = require('react')
var DatePicker = require('./src/index')

var DATE = Date.now()
var VALUE

var App = React.createClass({

    displayName: 'App',

    render: function(){
        var v = VALUE || Date.now()

        return <div style={{margin: 10}}>
            <DatePicker minDate='2014-04-04' maxDate='2015-10-10' date={v} hideFooter={true} viewDate={DATE} onChange={this.onChange}/></div>
    },

    onChange: function(date, dateString) {
        DATE  = dateString
        VALUE = dateString
        this.setState({})
    }
})

React.renderComponent(<App />, document.getElementById('content'))