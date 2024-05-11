const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: { app: "./src/index.js" },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Todo",
      template: "./src/index.html",
      inject: "body",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(s)css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpeg|jpg)$/,
        type: "asset/resource"
      },
      {
        test: /\.(png|svg|jpeg|jpg)$/,
        type: "asset/inline"
      },
      {
        test: /\.ttf$/,
        type: "asset/resource",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    assetModuleFilename: "src/assets/images/svg/[name].[ext]",
    clean: true,
  },
};
