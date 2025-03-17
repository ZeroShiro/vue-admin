const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    port: 1234,
    before(app, server) {
      app.get(/.*\.(js)$/, (req, res, next) => {
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
    },
    extract: true // 保持 extract 为 true，只在生产环境中有效
  },
  publicPath: "/admin",
  productionSourceMap: false, // 禁用 source map 在生产环境下，提高打包速度
  configureWebpack: {
    externals: {
      BMap: "BMap",
      echarts: "echarts",
      axios: "axios",
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      "element-ui": "ELEMENT"
    },
    plugins: [
      new CompressionWebpackPlugin({
        filename: info => `${info.path}.gz${info.query}`,
        algorithm: "gzip",
        threshold: 10240, // 10 KB 以下的文件不压缩
        test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
        minRatio: 0.8,
        deleteOriginalAssets: false
      })
    ]
  },
  chainWebpack: config => {
    config.optimization.minimize(true); // 启用压缩
    config.optimization.splitChunks({
      chunks: "all" // 自动分割代码，提升缓存利用
    });
  }
};
