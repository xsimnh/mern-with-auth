const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  target: "browserslist",
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    clean: true,
    filename: isDevelopment ? "[name].js" : "[name].[contenthash:8].js",
    chunkFilename: isDevelopment ? "[name].js" : "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "wwwroot"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        include: path.resolve(__dirname, "./src"),
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
        test: /\.(less|css)$/i,
        include: path.resolve(__dirname, "./src"),
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
        include: path.resolve(__dirname, "./src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
              plugins: [
                isDevelopment && "react-refresh/babel",
                //   BUG: cannot filter polyfill well with targets option, see detail https://github.com/babel/babel/issues/13226
                //   ["@babel/plugin-transform-runtime", { "corejs": 3 }]
              ].filter(Boolean),
            },
          },
        ],
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
      template: path.resolve(__dirname, "public/index.html"),
      favicon: path.resolve(__dirname, "public/favicon.ico"),
      appleTouchIcon: "/favicon.ico",
      filename: "index.html",
      inject: true,
      hash: true,
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
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components/index"),
      "@hooks": path.resolve(__dirname, "./src/hooks/index"),
      "@utils": path.resolve(__dirname, "./src/utils/index"),
    },
  },
};
