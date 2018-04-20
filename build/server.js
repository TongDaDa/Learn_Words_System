const webpackConfig = require("./webpack.config.dev.js");
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path')
let compiler = webpack(webpackConfig);
console.log(path.join(__dirname, "..", 'static'));
let server = new WebpackDevServer(compiler, {
    contentBase:path.join(__dirname, "..",'static'),
    publicPath: "/",
    stats: {colors: true,chunks:false},
}).listen(9090);
