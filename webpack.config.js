/**
 * Created by sunxianxiong on 17/1/23.
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackplugin = require('clean-webpack-plugin');
const pkg = require(path.join(__dirname, 'package.json'));
const theme = require(path.join(__dirname, pkg.theme));
const query = `{"sourceMap": true, "modifyVars": ${JSON.stringify(theme)}}`;

const copy = require('quickly-copy-file');
const del = require('del');

const autoprefixer = {
    browsers: [
        'Chrome >= 35',
        'Firefox >= 31',
        'Explorer >= 9',
        'Opera >= 12',
        'Safari >= 7.1'
    ]
};

const PATHS = {
    dist: path.join(__dirname, 'dist'),
    src: path.join(__dirname, 'src'),
    release: path.join(__dirname, 'release'),
};

const common = {
    entry: {
        [pkg.name]: './src/js/index',
        vendor: ['react', 'react-dom', 'mobx', 'mobx-react', './src/js/polyfill', 'fetch-jsonp']
    },
    externals: {
        jquery: 'window.$'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: PATHS.src
            }, {
                test: /\.json$/,
                loader: 'json-loader',
            }, {
                test: /\.txt$/,
                loader: 'raw-loader',
            }, {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/octet-stream'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=image/svg+xml'
            }, {
                test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
                loader: 'url?limit=10000'
            }
        ]
    },
    postcss: function() {
        return [
            require('postcss-nested')(),
            require('pixrem')(),
            require('autoprefixer')(autoprefixer),
            require('postcss-flexibility')(),
            require('postcss-discard-duplicates')()
        ];
    }
};

const startConfig = merge(common, {
    cache: true,
    debug: true,
    stats: {
        colors: true,
        reasons: true,
        timings: true,
    },
    devtool: 'source-map',
    output: {
        path: PATHS.dist,
        filename: '[name].js?[hash]',
        chunkFilename: '[chunkhash].chunk.js'
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&localIdentName=[local]!postcss!less?' + query)
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&localIdentName=[local]!postcss')
            },
        ]
    },
    devServer: {
        contentBase: PATHS.dist,

        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,

        stats: 'errors-only',

        host: process.env.HOST,
        port: process.env.PORT,
        outputPath: PATHS.dist
    },
    plugins: [
        new ProgressBarPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
            __DEV__: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest'],
            filename: '[name].js?[hash]',
        }),
        new ExtractTextPlugin('[name].css?[hash]'),
        new HtmlWebpackPlugin({
            title: pkg.name,
            inject: 'body',
            filename: 'index.html',
            template: 'index.html'
        })
    ]
});

const releaseConfig = merge(common, {
    output: {
        path: PATHS.release,
        publicPath: './release/',
        filename: '[name].js',
        chunkFilename: '[chunkhash].chunk.js'
    },
    plugins: [
        new ProgressBarPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            __DEV__: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest'],
            filename: '[name].js',
        }),
        new ExtractTextPlugin('[name].css'),
        new CleanWebpackplugin(['release'], {root: '', verbose: true})
    ],
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css?minimize&modules&localIdentName=[local]!postcss!less?' + query,{
                  publicPath: './'
                })
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?minimize&modules&localIdentName=[local]!postcss',{
                  publicPath: './'
                })
            }
        ]
    }
});

const releaseWatchConfig = merge(releaseConfig, {devtool: 'source-map'});

const TARGET = process.env.npm_lifecycle_event;
process.env.NODE_ENV = 'production';
switch(TARGET) {
    case 'release':
        module.exports = releaseConfig;
        break;
    case 'release:watch':
        module.exports = releaseWatchConfig;
        break;
    default:
        process.env.NODE_ENV = 'development';
        module.exports = startConfig;
        break;
}