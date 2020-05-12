const path = require('path')
const express = require('express');
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server');

const app = express()
const baseConfig = require('../config/idnex')
const config = require('./webpack.dev.conf')
const compiler = webpack(config);

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const devConfig = {
    contentBase: resolve('dist'),
    clientLogLevel: 'warning',
    hot: true,
    host: HOST || baseConfig.dev.host,
    port: PORT || baseConfig.dev.port,
    proxy: baseConfig.dev.proxyTable,

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
}

webpackDevServer.addDevServerEntrypoints(config, devConfig);

const server = new webpackDevServer(compiler, devConfig);

server.listen(devConfig.port, 'localhost', () => {
    console.log(`dev server listening on port ${ devConfig.port }`);
});