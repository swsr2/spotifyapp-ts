const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin"); 
const glob = require("glob"); 

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  const config = {
    mode: isProduction ? "production" : "development",
    entry: path.resolve(__dirname, "src", "index.tsx"),
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "@svgr/webpack",
              options: { icon: true },
            },
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]?ver=[hash]",
                outputPath: "images",
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|jpeg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]?ver=[hash]",
                outputPath: "images",
              },
            },
          ],
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      chunkFilename: "[name].js?ver=[hash]",
      filename: "[name].js?ver=[hash]",
      publicPath: "/",
    },
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    optimization: {
      minimize: isProduction,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
      }),
      new Dotenv({
        path: isProduction ? ".env.production" : ".env.development",
        defaults: ".env",
        allowEmptyValues: true,
        systemvars: true,
      }),
    ],
  };

  if (isProduction) {
    config.plugins.push(
      new PurgeCSSPlugin({
        paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, {
          nodir: true,
        }),
        safelist: {
          standard: [/^Mui/, /^css-/], // MUI 클래스 보호!
        },
      })
    );
  }

  return config;
};
