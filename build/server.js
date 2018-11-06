const { REQUEST_PROD_URL, REQUEST_LOCAL_URL } = require('../src/config');
const webpackConfig = require("./webpack.config.dev.js");
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path')

let compiler = webpack(webpackConfig);

let server = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, "..",'static'),
    publicPath: "/",
    proxy: {
        '/api': {
            target: REQUEST_PROD_URL,
            pathRewrite: {'^/api' : ''}
        },
    },
    stats: { colors: true, chunks:false },
}).listen(9090);
