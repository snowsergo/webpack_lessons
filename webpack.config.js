const path = require("path"); //подключаем path к конфигу вебпак
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключили к проекту плагин
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");

// module.exports — это синтаксис экспорта в Node.js
module.exports = {
  entry: { main: "./src/index.js" }, //точка входа
  output: {
    path: path.resolve(__dirname, "dist"), //путь к точке выхода
    filename: "[name].[chunkhash].js"
  },

  module: {
    rules: [
      {
        // тут описываются правила
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
        exclude: /node_modules/ // исключает папку node_modules
      },
      {
        test: /\.css$/, // применять это правило только к CSS-файлам
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"] // к этим файлам нужно применить пакеты, которые мы уже установили
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // filename: "style.css"
      filename: "style.[contenthash].css"
    }),

    new HtmlWebpackPlugin({
      // настроили плагин
      inject: false,
      // hash: true,
      template: "./src/index.html",
      filename: "index.html"
    }),

    new WebpackMd5Hash()
  ]
};
