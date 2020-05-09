const path = require('path')
const config = require('../config/idnex')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const isProd = process.env.NODE_ENV === "production";

module.exports = {
    mode: isProd ? "production" : "development",
    devtool: isProd ? config.build.devtool : config.dev.devtool,
    entry: {
        app: resolve('src/app.js'),
        index: resolve('src/script/index.js'),
    },
    devServer: {
        contentBase: './dist',
        publicPath: '/'
    },
    output: {
        path: resolve("dist"),
        filename: "js/[name].[chunkhash].js",
        publicPath: isProd ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.sass', '.scss'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            '@comm': resolve('src/components/common'),
            '@comps': resolve('src/components'),
            '@md': resolve('src/modules'),
            '@css': resolve('src/assets/styles'),
            '@lib': resolve('src/lib'),
            '@class': resolve('src/classes'),
            '@mixin': resolve('src/mixins'),
            '@img': resolve('static/imgs'),
            '@static': resolve('static'),
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|txt)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(txt)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: '[name].[hash:7].[ext]'
                }
            }
        ]
    },

    plugins: [
        
    ]
}