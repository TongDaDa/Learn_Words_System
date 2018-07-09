const path = require("path");
const webpack = require("webpack");
const rm = require('rimraf')
const CopyWebpackPlugin = require("copy-webpack-plugin")
// let ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
// let WebpackChunkHash = require("webpack-chunk-hash");


const baseConfig = require("./webpack.config.base");

baseConfig.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false}
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 30000
    }),
    new CopyWebpackPlugin([
        { from: path.join(__dirname,'..',"src/assets/img"), to: path.join(__dirname,"..","dist/assets") }
    ]),
);

rm(path.join(path.join(__dirname,'../dist')), err => {
    if (err) throw err
    webpack(baseConfig,(err,e) => {
        if (err) {
            console.log(err);
            console.log("打包失败");
        } else {
            console.log("打包成功");
        }
    });
})





