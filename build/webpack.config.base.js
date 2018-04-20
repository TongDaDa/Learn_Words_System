const path = require("path");
let webpack =require("webpack");
const {existsSync} = require('fs');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');
const SRC_PATH = path.resolve(__dirname, "../src");
const DIST_PATH = path.resolve(__dirname, "../dist");
const STATIC = path.resolve(SRC_PATH,"static");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pkgPath = path.join(__dirname, '../package.json');
const pkg = existsSync(pkgPath) ? require(pkgPath) : {};

let theme = {};
if (pkg.theme && typeof(pkg.theme) === 'string') {
    let cfgPath = pkg.theme;
    if (cfgPath.charAt(0) === '.') {
        cfgPath = path.resolve(args.cwd, cfgPath);
    }
    const getThemeConfig = require(cfgPath);
    theme = getThemeConfig();
} else if (pkg.theme && typeof(pkg.theme) === 'object') {
    theme = pkg.theme;
}

Object.keys(theme).forEach((variable)=>{
    theme[`@${variable}`] = theme[variable]
    try {
        delete theme[variable]
    }catch (e){}
})

console.log(theme);

module.exports = {
    entry:{
        main:path.join(SRC_PATH,"main.js"),
        vendor:[
            "react",
            "react-dom",
            "immutable",
        ]
    },
    output: {
        path:path.join(DIST_PATH),
        filename: "[name].[chunkhash].js",
        publicPath: './',
        chunkFilename: '[name].[chunkhash].chunk.js',
    },
    module: {
        loaders: [{
            test: /\.js|jsx$/,
            exclude: /node_modules/,
            loader: "babel-loader",
        }, {
            test: /\.css$/,
            // exclude: /node_modules/,
            use: ["style-loader", "css-loader"]
        }, {
            test: /\.(png|jpe?g|gif|svg)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10480,
                    name:'img/[name]-[hash:6].[ext]'
                }
            }]
        }, {
            test:[/\.less/],
            use:[
                {loader: 'style-loader'},
                {loader: 'css-loader'},
                {
                    loader:`less-loader`,
                    options:{
                        sourceMap:true,
                        modifyVars:theme
                    }
                }
            ]
        },{
            test: /\.scss$/,
            // exclude: /node_modules/,
            use:ExtractTextPlugin.extract({
                use:[{
                    loader:"css-loader",
                    options:{
                        importLoaders: 1,
                        modules:true
                    }
                },{
                    loader: 'postcss-loader',
                }]
            })
        }]
    },
    resolve:{
        extensions: ['.js','.jsx',".ts",".tsx",'.html'],
        alias:{
            com:path.resolve(SRC_PATH,"components"),
            utils:path.join(SRC_PATH,"utils"),
            store:path.resolve(SRC_PATH,"model"),
            services:path.resolve(SRC_PATH,"services"),
            config:path.resolve(SRC_PATH,"config"),
            script:path.resolve(SRC_PATH,"script"),
        }
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "style.css",
            disable: false,
            allChunks: true
        }),
        new CopyWebpackPlugin([
            { from: path.join('..',"static") }
        ]),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["main","vendor"], // vendor libs + extracted manifest
            minChunks: Infinity,
        }),
        new HtmlWebpackPlugin({
            name:"index.html",
            template:path.join(SRC_PATH,'index.html'),
        }),
        new webpack.DefinePlugin(Object.assign({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })),
    ]
};

console.log("finish");