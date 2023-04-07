const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { merge } = require("webpack-merge");
const dev = require("./webpack.dev");
const appPath = require("./path");

module.exports = merge(dev, {
  devServer: {
    static: {
      directory: appPath.wwwroot,
      publicPath: appPath.publicPath,
    },
    port: 7000,
    open: true,
    hot: true,
    https: true,
    compress: true,
    historyApiFallback: true,
  },
  plugins: [new ReactRefreshWebpackPlugin()],
});
