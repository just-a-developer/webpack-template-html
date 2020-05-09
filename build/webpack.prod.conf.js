const path = require('path')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseWebpackConfig = require('./webpack.base.conf')
const autoprefixer = require("autoprefixer")

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
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
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash].css',
            chunkFilename: 'css/[id].[chunkhash].css',
        }),
        new HtmlWebpackPlugin({
            filename: 'view/index.html',
            template: resolve('src/view/index.html'),
            chunks: ['app']
        })
    ]
})