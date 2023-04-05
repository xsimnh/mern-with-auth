// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const { merge } = require("webpack-merge");

// const smp = new SpeedMeasurePlugin();
const common = require("./webpack.common");
const appPath = require("./path");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  cache: {
    type: "filesystem",
    cacheDirectory: appPath.get("node_modules/.cache"),
    store: "pack",
    buildDependencies: {
      defaultWebpack: ["webpack/lib/"],
      config: [__filename],
    },
  },
  optimization: {
    minimize: false,
  },
});

// module.exports = smp.wrap(config);
