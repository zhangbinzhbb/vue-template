"use strict";
const path = require("path");
// 实现web项目 全局修改主题颜色
const themeColorReplacer = require("webpack-theme-color-replacer");
const {
  getThemeColors,
  modifyVars,
} = require("./src/utils/themeUtils/themeUtil");
const {
  resolveCss,
} = require("./src/utils/themeUtils/theme-color-replacer-extend");

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // 将构建好的文件输出到哪里
  outputDir: "dist",
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",
  // 是否在保存的时候检查
  lintOnSave: process.env.NODE_ENV === "development",
  // 生产环境是否生成 SourceMap
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    before: require("./mock/mock-server.js"),
  },
  // 解决ant-design-vue 按需引入组件 less 版本冲突问题
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // important extra layer for less-loader^6.0.0
          // 使用 modifyVars 的方式来进行覆盖antd变量
          modifyVars: modifyVars(),
          javascriptEnabled: true,
        },
      },
    },
  },
  pluginOptions: {
    //引入全局less变量的方式
    "style-resources-loader": {
      preProcessor: "less",
      //这个是加上自己的路径，
      //注意：试过不能使用别名路径
      patterns: [
        path.resolve(__dirname, "./src/theme/theme.less"),
        path.resolve(__dirname, "./src/styles/variables.less"),
      ],
    },
  },
  configureWebpack: (config) => {
    config.entry.app = ["babel-polyfill", "./src/main.js"];
    config.plugins.push(
      // 生成仅包含颜色的替换样式（主题色等）
      new themeColorReplacer({
        fileName: "css/theme-colors-[contenthash:8].css",
        matchColors: getThemeColors(),
        injectCss: true,
        resolveCss,
      })
    );
  },
};
