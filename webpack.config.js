const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { merge } = require("webpack-merge");
const fs = require("fs");

const common = {
  target: "browserslist",
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    clean: true,
    filename: "[name].js",
    path: path.resolve(__dirname, "wwwroot"),
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        exclude: /node_modules/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "images/[name].[contenthash:8][ext]",
        },
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  optimization: {
    usedExports: true,
    providedExports: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            // module: true,
            // toplevel: true,
            drop_console: false,
            pure_funcs: ["console.log"],
            collapse_vars: false,
            reduce_vars: false,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    // splitChunks: {
    //     chunks: "async",
    //     cacheGroups: {
    //         vendors: {
    //             test: /[\\/]node_modules[\\/]/,
    //             name: "vendors",
    //             chunks: "all",
    //             priority: -10,
    //         },
    //         common: {
    //             name: "common",
    //             minChunks: 1,
    //             priority: -20,
    //             reuseExistingChunk: true,
    //         },
    //     },
    // },
  },
  plugins: [new CaseSensitivePathsPlugin()],
  resolve: {
    modules: ["./node_modules"],
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json", ".less", ".css"],
  },
};

const dev = {
  mode: "development",
  output: {
    chunkFilename: "[name].js",
  },
  devtool: "source-map",
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
      directory: path.resolve(__dirname, "public"),
      publicPath: "",
      watch: {
        ignored: /node_modules/,
      },
    },
    port: 7000,
    hot: true,
    open: true,
    https: true,
    compress: true,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "public/index.html"),
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       context: "public",
    //       from: "*",
    //       filter: (resourcePath) => {
    //         return fs.realpathSync(resourcePath) != path.resolve(__dirname, "public/index.html");
    //       },
    //       to: "",
    //     },
    //   ],
    // }),
  ],
};

const prod = {
  mode: "production",
  output: {
    chunkFilename: "[name].[contenthash:8].js",
  },
  devtool: false,
  stats: "errors-only",
  optimization: {
    minimize: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[name].[contenthash:8].css",
    }),
  ],
};

module.exports = (env) => {
  const { production = false } = env;
  return merge(common, production ? prod : dev);
};
