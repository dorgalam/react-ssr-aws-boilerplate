const path = require("path");

module.exports = function(argv) {
  const plugins = [];
  if (argv.mode === "development") {
    const hardSourceWebpackPlugin = require("hard-source-webpack-plugin");
    plugins.push(new hardSourceWebpackPlugin());
  } else if (argv.analyze) {
    const Visualizer = require("webpack-visualizer-plugin");
    plugins.push(new Visualizer());
  }
  return {
    output: {
      // path needs to be an ABSOLUTE file path
      path: path.resolve(process.cwd(), "dist"),
      publicPath: "/"
    },
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json", ".css"],
      alias: {
        "~": path.resolve(__dirname, "../src")
      }
    },
    devServer: {
      compress: true
    },
    plugins,
    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
                experimentalWatchApi: true
              }
            }
          ]
        }
      ]
    }
  };
};
