'use strict';

require('./index.styl')

var React      = require('react')
var DatePicker = require('react-date-picker')

var DAY = 1000 * 60 * 60 * 24
var NOW = +new Date

var pickerDate = NOW

var App = React.createClass({

    displayName: 'App',

    render: function(){
        return <div>
            <h1>React Date Picker</h1>


            <code>npm install --save react-date-picker</code>
            <p>You can style the picker using the <b>date-picker</b> css class and other 'dp-*' prefixed classes.</p>
            <p>Just inspect the datepicker to see available classes.</p>
            <p>Github: <a href="https://github.com/radubrehar/react-date-picker">radubrehar/react-date-picker</a></p>

            <h2>Example with min date &amp; max date set. (-30 &amp; +60 days)</h2>

            <DatePicker
                    minDate={NOW - 30 * DAY}
                    maxDate={NOW + 60 * DAY}
                    date={pickerDate}
                    onChange={this.onChange}
                />
        </div>
    },

    onChange: function(moment, dateString) {
        pickerDate  = moment

        //now re-render the app
        console.log('selected ', dateString)
        this.setState({})
    }
})

React.render(<App />, document.getElementById('content'))