const webpack = require("webpack");
const path = require("path");
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var config = {
  stats: {
    colors: true
  },

  resolve: {
    alias: {
      "common": path.resolve(__dirname, "../cmi-common/src/js"),
      "acim": path.resolve(__dirname, "../cmi-acim/src/js"),
      "oe": path.resolve(__dirname, "../cmi-oe/src/js"),
      "acol": path.resolve(__dirname, "../cmi-acol/src/js"),
      "col": path.resolve(__dirname, "../cmi-col/src/js"),
      "ftcm": path.resolve(__dirname, "../cmi-ftcm/src/js"),
      "jsb": path.resolve(__dirname, "../cmi-jsb/src/js"),
      "raj": path.resolve(__dirname, "../cmi-raj/src/js"),
      "pwom": path.resolve(__dirname, "../cmi-pwom/src/js"),
      "wom": path.resolve(__dirname, "../cmi-wom/src/js")
    }
  },

  entry: {
    transcript: ["./src/js/transcript.js"],
    profile: ["./src/js/profile.js"],
    page: ["./src/js/page.js"]
  },
  output: {
    path: path.join(__dirname, "public/js"),
    publicPath: "/public/js",
    filename: "[name].js"
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    }
  },
  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=/[hash].[ext]"
      },
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {cacheDirectory: true}
      }
    ]
  },
  plugins: [ ]
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    //config.devtool = "source-map";
    //config.plugins.push(new BundleAnalyzerPlugin({analyzerPort: 8899}));
  }

  if (argv.mode === "production") {
  }

  return config;
};

