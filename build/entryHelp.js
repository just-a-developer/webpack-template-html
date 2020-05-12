const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
const isProd = process.env.NODE_ENV === "production";

const defaults = {
    title: '',
    filename: '',
    template: '',
    chunks: '',
}
console.log(isProd);
// 构建入口
exports.buildEntry = function (entrys) {
    let entry = {};

    entrys.forEach(item => {
        // entry[item.entry] = isProd ? item.entryPath : [item.entryPath, resolve('build/hotCode.js')];
        entry[item.entry] = item.entryPath;
    })
    
    return entry;
}

// 构建生成 HTML 模板的入口
exports.buildTemplateEntry = function (entrys) {
    let arr = [];
        
    entrys.forEach(item => {
        let opt = Object.assign({}, defaults);

        opt.title = item.title;
        opt.filename = `view/${ item.filename || item.entry }.html`;
        opt.template = item.template;
        opt.chunks = [item.entry]

        arr.push(new HtmlWebpackPlugin(opt));
    })

    return arr;
}