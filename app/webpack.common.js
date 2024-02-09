const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

const bundleFolder = './dist/';

module.exports = {
    cache: true,
    output: {
        path: path.resolve(__dirname, bundleFolder),
        publicPath: '/',
        pathinfo: false,
        chunkFilename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })]
    }
};

