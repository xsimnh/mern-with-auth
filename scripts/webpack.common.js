const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";
const appPath = require("./path");

module.exports = {
  target: "browserslist",
  entry: {
    index: "./client/index.tsx",
  },
  output: {
    clean: true,
    filename: isDevelopment ? "[name].js" : "[name].[contenthash:8].js",
    chunkFilename: isDevelopment ? "[name].js" : "[name].[contenthash:8].js",
    path: appPath.wwwroot,
    publicPath: appPath.publicPath,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        include: appPath.src,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: `images/[name].${isDevelopment ? "" : "[contenthash:8]"}[ext]`,
        },
      },
      {
        test: /\.(less|css)$/i,
        include: appPath.src,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: {
                mode: (resourcePath) => {
                  if (/\.module\.(less|css)$/.test(resourcePath)) {
                    return "local";
                  }
                  return "global";
                },
                localIdentName: isDevelopment ? "[path][name]__[local]" : "[hash:base64]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        include: appPath.src,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[contenthash:8].css",
      chunkFilename: isDevelopment ? "[name].css" : "[name].[contenthash:8].css",
    }),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      template: appPath.get("public/index.html"),
      favicon: appPath.get("public/favicon.ico"),
      appleTouchIcon: "/favicon.ico",
      filename: "index.html",
      inject: true,
      hash: !isDevelopment,
      cache: false,
      minify: isDevelopment ? false : true,
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: "public/**",
    //       to: "[name][ext]",
    //       globOptions: {
    //         ignore: ["**/index.html"],
    //       },
    //     },
    //   ],
    // }),
  ],
  resolve: {
    modules: ["./node_modules"],
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    alias: {
      "@": appPath.src,
    },
  },
};
