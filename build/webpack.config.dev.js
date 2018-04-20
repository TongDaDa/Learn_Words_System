let webpack = require('webpack');
let baseConfig = require("./webpack.config.base.js");

// baseConfig.plugins.push(
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoEmitOnErrorsPlugin()
// )

module.exports = baseConfig;