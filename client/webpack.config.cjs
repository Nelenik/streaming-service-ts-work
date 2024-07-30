// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// функция вставляет хэширование в зависимости от сборки

const isProduction = process.env.NODE_ENV == "production";

const filename = (name, ext) =>
  !isProduction ? `${name}${ext}` : `${name}.[contenthash]${ext}`;

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/ts/main.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `js/${filename("[name]", ".js")}`,
    clean: true,
  },
  devServer: {
    open: true,
    hot: false,
    liveReload: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: `assets/fonts/[name][ext]`,
        },
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: `assets/img/[name][ext]`,
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    alias: {
      img: path.resolve(__dirname, "src/img"),
      components: path.resolve(__dirname, "src/ts/components"),
      helpers: path.resolve(__dirname, "src/ts/helpers"),
      types: path.resolve(__dirname, "src/types"),
      mocks: path.resolve(__dirname, "src/mocks"),
      core: path.resolve(__dirname, "src/ts/core"),
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: `css/${filename("[name]", ".css")}`,
      })
    );
  } else {
    config.mode = "development";
    config.devtool = "source-map";
  }
  return config;
};
