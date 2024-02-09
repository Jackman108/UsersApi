const webpack = require('webpack');
const path = require('path');

module.exports = {
    module: {
        rules: [
            
            {
                test: /\.(ico)$/,
                include: [path.join(__dirname, 'assets/images')],
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'img'
                }
            },
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader',
                    options: {}
                }
            }
        ]
    }
};

