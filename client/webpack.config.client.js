const path = require("path");
const webpack = require("webpack");
const CURRENT_WORKING_DIR = process.cwd();

module.exports = {
  name: "browser",
  mode: "development",
  devtool: "eval-source-map",
  entry: [
    path.join(CURRENT_WORKING_DIR, "main.js"),
  ],
  output: {
    path: path.join(CURRENT_WORKING_DIR, "/dist"),
    filename: "bundle.js",
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
};

