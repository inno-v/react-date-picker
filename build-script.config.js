var CONFIG = require('./boilerplate.json')

var scriptConfig = CONFIG.style || {}
var mainFile     = scriptConfig.main || './index.jsx'
var outputFile   = scriptConfig.output || './bundle.js'

module.exports = {
    entry: mainFile,
    output: {
        filename: outputFile
    },
    module: {
        loaders: require('./loaders.config')
    },
    externals: {
        'react': 'React'
    },
    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.js', '.jsx']
    }
}