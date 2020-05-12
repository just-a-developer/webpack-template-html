const path = require('path')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

let entrys = {
    globalParameters: {},
    list: [
        {
            entry: 'index',
            entryPath: resolve('src/script/index.js'),
            title: '默认页面',
            template: resolve('src/view/index.html'),
        },
        {
            entry: 'home',
            entryPath: resolve('src/script/home.js'),
            title: '首页',
            template: resolve('src/view/home.html'),
        },
        {
            title: '测试页面A',
            filename: 'pageA',
            template: resolve('src/view/pageA.art'),
            templateParameters: {
                title: '这个是你想要的东西吗',
                list: ['A', 'B', 'C', 'D']
            }
        },
        {
            title: '测试页面B',
            filename: 'pageB',
            template: resolve('src/view/pageB.art'),
            templateParameters: {
                title: '这个是你想要的东西吗',
                list: ['A', 'B', 'C', 'D']
            }
        },
    ]
}

module.exports = entrys