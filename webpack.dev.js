const path = require("path");
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const { merge } = require("webpack-merge");

// const smp = new SpeedMeasurePlugin();
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  cache: {
    type: "filesystem",
    cacheDirectory: path.resolve(__dirname, "node_modules/.cache"),
    store: "pack",
    buildDependencies: {
      defaultWebpack: ["webpack/lib/"],
      config: [__filename],
    },
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "wwwroot"),
      publicPath: "",
    },
    port: 7000,
    open: true,
    hot: true,
    https: true,
    compress: true,
    historyApiFallback: true,
  },
  optimization: {
    minimize: false,
  },
});

// module.exports = smp.wrap(config);
