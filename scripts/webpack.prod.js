const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { merge } = require("webpack-merge");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  devtool: false,
  stats: "errors-only",
  optimization: {
    minimize: true,
    usedExports: true,
    providedExports: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"],
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "async",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          priority: -10,
        },
        common: {
          name: "common",
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  //   plugins: [new BundleAnalyzerPlugin()],
});
