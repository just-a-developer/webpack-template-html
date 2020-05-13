const path = require('path')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const htmlLoader = require('html-loader')

const utils =  require('./util')
const entryHelp = require('./entryHelp')
const config = require('../config/idnex')
const entrys = require('../config/entry')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const isProd = process.env.NODE_ENV === "production";

module.exports = {
    mode: isProd ? "production" : "development",
    devtool: isProd ? config.build.devtool : config.dev.devtool,
    entry: entryHelp.buildEntry(entrys),
    
    output: {
        path: resolve("dist"),
        filename: utils.assetsPath('js/[name].js'),
        publicPath: isProd ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath,
        chunkFilename: utils.assetsPath('js/[name].js'),
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
            '@plugin': resolve('public/plugins'),
            '@class': resolve('src/classes'),
            '@mixin': resolve('src/mixins'),
            '@img': resolve('public/imgs'),
            '@static': resolve('public'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/, resolve('public')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            esModule: false,
                            name: utils.assetsPath('img/[name].[ext]?[hash]')
                        },
                    },
                    // 图片压缩
                    {
                        loader: 'image-webpack-loader',// 压缩图片
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },

                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.art$/,
                include: [resolve('src')],
                loader: 'art-template-loader',
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
                    name: 'txt/[name].[hash:7].[ext]'
                }
            }
        ]
    },

    optimization: {
        minimize: isProd,
        splitChunks: {
            chunks: "all", // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
            minSize: 30 * 1000, // 模块超过30k自动被抽离成公共模块
            maxAsyncRequests: 5,  // 异步加载chunk的并发请求数量<=5
            maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
            name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function

            cacheGroups: {
                
                //公用模块抽离
                scripts: {
                    name: 'common',
                    minSize: 0, //大于0个字节
                    minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
                },

                vendors: {  // 抽离第三方插件
                    test: /[\\/]node_modules[\\/]/,     // 指定是node_modules下的第三方包
                    name: "vendors",
                    priority: -10                       // 抽取优先级
                },
            }
        },

        // 为 webpack 运行时代码创建单独的chunk
        runtimeChunk:{
            name:'manifest'
        },

        minimizer: [

            // 多进程压缩
            new ParallelUglifyPlugin({
                cacheDir: '.cache/',
                uglifyJS: {
                    output: {
                        comments: false,
                        beautify: false
                    },
                    warnings: false,
                    compress: {
                        drop_console: true,
                        collapse_vars: true,
                        reduce_vars: true
                    }
                }
            }),
        ]
    },

    externals: {
        jquery: 'jQuery'
    }
}