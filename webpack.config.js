const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimize: false, // Need this to copy readable prod code into openprocessing IDE
        runtimeChunk: 'single',
        splitChunks: getSplitChunks(),
    },
    plugins: [
        new HtmlWebpackPlugin({title: 'Fast Fourier Transform'}),
        new webpack.HashedModuleIdsPlugin(),
        new CleanWebpackPlugin(),
        new CopyPlugin([{from: 'assets', to: ''}]),
    ],
    devServer: getDevServer()
}

module.rules = [
    {
        test: /\.m?js$/,
        exclude: /(node_modules|lib)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    }
];

function getSplitChunks() {
    return {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                    const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                    return `npm.${packageName.replace('@', '')}`;
                },
            },
            lib: {
                test: /[\\/]lib[\\/]/,
                name: 'lib',
                chunks: 'all'
            },
        },
    };
}

function getDevServer() {
    return {
        host: '127.0.0.1',
        port: 8000,
        disableHostCheck: true,
        open: true
    };
}

