const commonConfig = require("./common.config.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const version = require("../package.json").version;
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const HTML = require("html-webpack-plugin");
const HtmlWebpackExcludeAssetsPlugin = require("html-webpack-exclude-assets-plugin");

module.exports = function(env, argv) {
  const isDev = argv.mode === "development";

  const clientConfig = {
    entry: {
      bundle: "./src/client/index.tsx",
      "bundle.min": "./src/client/index.tsx"
    },
    output: {
      filename: isDev
        ? "client/statics/[name].js"
        : `client/statics/${version}/[name].js`
    },
    plugins: [
      new UglifyJsPlugin({
        include: /\.min\.js$/,
        cache: true,
        parallel: true
      }),
      new MiniCssExtractPlugin({
        filename: isDev
          ? "client/statics/styles.css"
          : `client/statics/${version}/styles.css`
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CompressionPlugin({
        filename: isDev ? "[path].gz" : "[path]"
      }),
      new HTML({
        template: "!!raw-loader!src/server/views/index.ejs",
        filename: "./server/views/index.ejs", //for me, output file is index.ejs only and not
        excludeAssets: [/.*.js/, /.*.css/] // exclude style.js or style.[chunkhash].js

        // minify: {
        //   removeComments: true,
        //   collapseWhitespace: true,
        //   conservativeCollapse: true
        // }
      }),
      new HtmlWebpackExcludeAssetsPlugin()
    ],
    optimization: {
      minimizer: [new OptimizeCSSAssetsPlugin()]
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            "css-loader"
          ]
        }
      ]
    }
  };

  if (!isDev) {
    clientConfig.devtool = "source-map";
  }

  return merge(commonConfig(argv), clientConfig);
};
