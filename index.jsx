'use strict'

require('./index.styl')

var React = require('react')
var DatePicker = require('./src/index')

var App = React.createClass({

    displayName: 'App',

    render: function(){
        return <div style={{margin: 10}}><DatePicker /></div>
    }
})

React.renderComponent(<App />, document.getElementById('content'))