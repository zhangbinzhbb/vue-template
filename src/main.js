import Vue from "vue";
// import Antd from "ant-design-vue";
import Antd from "ant-design-vue/es";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入样式
// Less 主题
import "./theme/index.less";

Vue.config.productionTip = false;
Vue.use(Antd);

/**
 * 如果您不想使用模拟服务器
 * 你想用MockJs来模拟api
 * 可以执行:mockXHR()
 * 目前MockJs将用于生产环境，
 * 请在上线前删除!!!
 **/
// 通过环境变量来判断是否需要加载启用
if (process.env.NODE_ENV === "development") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
