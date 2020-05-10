const path = require('path')
const merge = require('webpack-merge')
const autoprefixer = require("autoprefixer")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseWebpackConfig = require('./webpack.base.conf')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

module.exports = merge(baseWebpackConfig, {
    devServer: {
        contentBase: './dist',
        publicPath: config.dev.assetsPublicPath,
        clientLogLevel: 'warning',
        hot: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        proxy: config.dev.proxyTable,
    },

    module: {
        rules: [
            {
                test: /\.(sass|scss|css)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
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
        new HtmlWebpackPlugin({
            filename: 'view/index.html',
            template: resolve('src/view/index.html'),
            chunks: ['app']
        }),
    ]
})