const commonConfig = require("./common.config.js");

const merge = require("webpack-merge");
const version = require("../package.json").version;
const webpack = require("webpack");

module.exports = function(env, argv) {
  const STATICS_URL =
    argv.mode === "development"
      ? `http://localhost:8080/client/statics`
      : `AWS_BUCKET_PUBLIC_URL/statics/${version}`;
  const serverConfig = {
    entry: "./src/server/index.tsx",
    target: "node",
    output: {
      filename: "server/bundle.js",
      libraryTarget: "commonjs"
    },
    optimization: {
      minimize: false
    },
    plugins: [
      new webpack.DefinePlugin({
        STATICS_URL: JSON.stringify(STATICS_URL)
      })
    ],
    node: {
      __dirname: false
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["css-loader"]
        }
      ]
    }
  };

  return merge(commonConfig(argv), serverConfig);
};
