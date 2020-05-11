const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const autoprefixer = require("autoprefixer")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const utils =  require('./util')
const config = require('../config/idnex')
const baseWebpackConfig = require('./webpack.base.conf')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

module.exports = merge(baseWebpackConfig, {
    devServer: {
        contentBase: resolve('dist'),
        clientLogLevel: 'warning',
        hot: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        proxy: config.dev.proxyTable,

        // html 文件修改时刷新整个页面
        before(app, server, compiler) {
            const watchFiles = ['.html'];

            compiler.hooks.done.tap('done', () => {
                const changedFiles = Object.keys(compiler.watchFileSystem.watcher.mtimes);

                if (
                    this.hot
                    && changedFiles.some(filePath => watchFiles.includes(path.parse(filePath).ext))
                ) {
                    server.sockWrite(server.sockets, 'content-changed');
                }
            });
        },
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

        // 模块热替换
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),

        // 模板构建
        new HtmlWebpackPlugin({
            filename: 'view/index.html',
            template: resolve('src/view/index.html'),
            chunks: ['index']
        }),

        new HtmlWebpackPlugin({
            filename: 'view/home.html',
            template: resolve('src/view/home.html'),
            chunks: ['home']
        })
    ]
})