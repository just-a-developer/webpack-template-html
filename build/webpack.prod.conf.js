const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const cssnano = require('cssnano')

const utils =  require('./util')
const entryHelp = require('./entryHelp')
const config = require('../config/idnex')
const baseWebpackConfig = require('./webpack.base.conf')
const autoprefixer = require("autoprefixer")
const entrys = require('../config/entry')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
    },

    module: {
        rules: [
            {
                test: /\.(sass|scss|css)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'postcss-loader', options: { 
                        sourceMap: true,
                        plugins: [autoprefixer({})]
                    } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            }
        ]
    },

    plugins: [

        new webpack.DefinePlugin({
            'process.env': 'production'
        }),

        // 清除之前的构建
        new CleanWebpackPlugin(),

        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: resolve('public'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ]),

        // 代码压缩
        new UglifyJsPlugin({
            uglifyOptions: {
                warnings: false,
                compress: {
                    drop_console: true, // 删除所有的console语句
                    
                    reduce_vars: true,  // 把使用多次的静态值自动定义为变量
                },
                output: {
                    comments: false, // 不保留注释
                }
            },
            sourceMap: config.build.productionSourceMap,
            parallel: true
        }),

        // 样式抽离
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            chunkFilename: utils.assetsPath('css/[name].[contenthash].css'),
        }),

        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true,
                    },
                    normalizeUnicode: false
                }]
            },
            canPrint: true
        }),

        // 模板构建
        ...entryHelp.buildTemplateEntry(entrys)
    ],

    
})