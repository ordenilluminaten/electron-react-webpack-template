const webpack = require('webpack');
const path = require('path');

const config = {
    entry: {
        main: path.resolve('src/index.js')
    },

    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
        publicPath: './' 
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }

};

module.exports = config;