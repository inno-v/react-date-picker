'use strict'

//
// PLEASE MANUALLY REQUIRE YOUR STYLE:
// require('./index.styl')
//

var React = require('react')

var App = React.createClass({

    displayName: 'App',

    render: function(){
        return <div>Hello React + Webpack</div>
    }
})

React.renderComponent(<App />, document.getElementById('content'))