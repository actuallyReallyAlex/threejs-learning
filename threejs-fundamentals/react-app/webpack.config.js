const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const mode = process.env.NODE_ENV || "production";

const config = {
  entry: "./src/app/index.tsx",
  devServer: {
    contentBase: path.join(__dirname, "src/assets/"),
    contentBasePublicPath: "/assets",
  },
  mode,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        type: "asset/inline",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./src/app/index.html"),
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(mode),
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

if (process.env.NODE_ENV === "development") {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
