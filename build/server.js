const webpackConfig = require("./webpack.config.dev.js");
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path')
let compiler = webpack(webpackConfig);

let server = new WebpackDevServer(compiler, {
    contentBase:path.join(__dirname, "..",'static'),
    publicPath: "/",
    proxy: {
        '/api': {
            target:"http://127.0.0.1:8899",
            pathRewrite: {'^/api' : ''}
        },
    },
    stats: { colors: true, chunks:false },
}).listen(9090);