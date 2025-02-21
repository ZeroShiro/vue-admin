// const webpack = require('webpack');
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const compress = new CompressionWebpackPlugin({
  filename: info => {
    return `${info.path}.gz${info.query}`;
  },
  algorithm: "gzip",
  threshold: 10240,
  test: new RegExp("\\.(" + ["js"].join("|") + ")$"),
  minRatio: 0.8,
  deleteOriginalAssets: false
});

module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    port: 1234,
    before(app, server) {
      app.get(/.*.(js)$/, (req, res, next) => {
        req.url = req.url + ".gz";
        res.set("Content-Encoding", "gzip");
        next();
      });
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/_variavle.scss";`
      }
    }
  },
  publicPath: "/",
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      BMap: "BMap",
      echarts: "echarts",
      axios: "axios",
      vue: "Vue",
      "element-ui": "ELEMENT"
    },
    plugins: [compress]
  },
  chainWebpack: config => {
    config.optimization.minimize(true);
    config.optimization.splitChunks({
      chunks: "all"
    });
  },
  css: {
    extract: true
  }
};
