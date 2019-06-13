const webpack = require("webpack");
const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = function webpackTemplateConfig(__dirname, config) {
  return {
    module: {
      rules: [
        {
          loader: "babel-loader",
          options: {
            plugins: ["syntax-dynamic-import"],
            presets: ["@babel/preset-env", "@babel/preset-react"]
          },

          test: /\.jsx?$/
        }
      ]
    },

    entry: {
      index: "./src/index.js"
    },

    output: {
      filename: "[name].[chunkhash].js",
      path: path.resolve(__dirname, "dist")
    },
    resolve: {
      extensions: [".jsx", ".js"]
    },
    mode: "development",
    plugins: [
      new UglifyJSPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(
          __dirname,
          "node_modules/@SS/html-template/template.html"
        )
      })
    ]
  };
};
