const path = require('path')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

let entrys = [
    {
        entry: 'index',
        entryPath: resolve('src/script/index.js'),
        title: 'index',
        template: resolve('src/view/index.html'),
    },
    {
        entry: 'home',
        entryPath: resolve('src/script/home.js'),
        title: 'home',
        template: resolve('src/view/home.html'),
    },
]

module.exports = entrys