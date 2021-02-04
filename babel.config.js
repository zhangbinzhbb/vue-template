module.exports = {
  presets: [
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    "@vue/cli-plugin-babel/preset",
  ],
  env: {
    development: {
      // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
      // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
      // https://panjiachen.github.io/vue-element-admin-site/guide/advanced/lazy-loading.html
      plugins: ["dynamic-import-node"],
    },
  },
  // ant-design-vue加入按需加载 配置 babel-plugin-import
  plugins: [
    [
      "import",
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "es",
        style: "css", // `style: true` 会加载 less 文件
      },
    ],
  ],
};
