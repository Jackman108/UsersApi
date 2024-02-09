const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const fonts = require('./webpack.fonts.js');
const icons = require('./webpack.icons.js');
const images = require('./webpack.images.js');
const scripts = require('./webpack.scripts.js');
const styles = require('./webpack.styles.dev.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, fonts, icons, images, scripts, styles, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack/hot/only-dev-server',
            './src/index.tsx',
            './assets/styles.dev.less'
        ]
    },
    devServer: {
        hot: true,
        inline: true,
        compress: true,
        contentBase: './dist/',
        port: 3004,
        historyApiFallback: true
    },
    performance: {
        hints: false
    },
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CopyWebpackPlugin({ 
            patterns: [{ from: 'assets/images/**/*' }]
          }),
        new CopyWebpackPlugin({ 
            patterns: [{ from: 'assets/styles/**/*' }]
          }),
        new CopyWebpackPlugin({
            patterns: [{ from: 'assets/fonts/**/*' }]
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            favicon: 'assets/images/favicon.ico',
            chunks: ['app']
        }),
        new webpack.DefinePlugin({
            'process.env': {
                ENV_CONFIGURATION: "'dev'"
            }
        })
    ]
});
