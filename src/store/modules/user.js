import * as user from "@/api/user";
import * as menu from "@/api/menu";
import {
  setLocal,
} from "@/utils/local";
// removeToken

import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth';

import router from "@/router/index";
import per from "@/router/permission";

// 过滤的当前用户支持的路由
const filterRouter = authList => {
  let auths = authList.map(item => item.auth);
  const filter = authRoutes => {
    let result = authRoutes.filter(route => {
      if (auths.includes(route.meta.auth, )) {
        if (route.children) {
          route.children = filter(route.children);
        }
        return route;
      }
    }, );
    return result;
  };
  return filter(per);
};

export default {
  state: {
    userInfo: {}, // 用户信息
    hasPermission: false, // 代表用户权限
    menuPermission: false,
    token: getToken(),
    menuList: [], // 左侧菜单权限
    menuLeftList: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, payload) => {
      state.userInfo = payload;
    },
    SET_PERMISSION: (state, has) => {
      state.hasPermission = has;
    },
    SET_MENU_PERMISSION: (state, has) => {
      state.menuPermission = has;
    },
    UPDATE_MENU_LIST: (state, data) => {
      state.menuList = data;
    },
    SET_MENU_LIST: (state, data) => {
      const result = []
      data.forEach(item => {
        const obj = {}
        item.children.forEach(sub => {
          obj.path = item.path + '/' + sub.path
          obj.name = sub.meta.title
          obj.icon = sub.meta.icon
          obj.id = sub.meta.id
          if (item.path === '/') {
            obj.path = '/'
          }
        })
        result.push(obj)
      })
      state.menuLeftList = result;
    }
  },
  actions: {
    // 设置菜单列表
    async setMenuList({
      commit
    }, data) {
      // 后端返回的用户的权限
      let authList = data;

      let str = "";
      authList.forEach((value) => {
        str += value.code + ",";
      });

      const newMenu = [];
      const routes = router.options.routes;
      const arr = [];
      let LIST = [];

      routes.forEach((value) => {
        if (value.children) {
          value.children.forEach((v) => {
            const children = [];
            if (v.meta && v.meta.permission && str.includes(v.meta.permission)) {
              children.push(v);
              const row = {
                path: value.path,
                component: value.component,
                name: value.name,
                meta: value.meta,
                children: children,
              };
              newMenu.push(row);
            }
          });
          if (value.path === '/' || value.path === '/home') {
            arr.push(value);
          }
          LIST = [...arr, ...newMenu];
        }
      });
      commit('SET_MENU_LIST', LIST);
    },
    // 更新菜单权限列表
    async updateMenuList({
      commit,
      dispatch
    }, code) {
      const result = await menu.updateMenu({
        code
      });
      commit('UPDATE_MENU_LIST', result.data);
      dispatch('setMenuList', result.data);
    },
    // 获取菜单权限列表
    async menuList({
      commit
    }) {
      const result = await menu.getMenu();
      commit('UPDATE_MENU_LIST', result.data);
      return result.data;
    },
    // 设置用户信息
    async setUser({
      commit,
    }, {
      payload,
      hasPermission,
    }, ) {
      commit('SET_USER', payload);
      commit('SET_PERMISSION', hasPermission);
      //设置token
      const token = "token";
      setToken(token);
    },
    // 登录
    async userLogin({
      dispatch,
    }, userInfo) {
      let result = await user.login(userInfo);
      dispatch('setUser', {
        payload: result.data,
        hasPermission: true,
      });
      return result;
    },
    // 验证是否登录
    async userValidate({
      dispatch,
    }, ) {
      if (!getToken()) return false;
      try {
        let result = await user.validate();
        dispatch('setUser', {
          payload: result.data,
          hasPermission: true,
        }, );
        return true;
      } catch (e) {
        dispatch('setUser', {
          payload: {},
          hasPermission: false,
        });
      }
    },
    // 添加路由动作
    async addRoute({
      commit,
      state,
    }, ) {
      // 后端返回的用户的权限
      let authList = state.userInfo.authList;
      if (authList) {
        // 开始 规划路由
        let routes = filterRouter(authList);
        let route = router.options.routes.find(
          item => item.path === "/manager",
        );
        route.children = routes;
        router.addRoutes([route]);
        commit('SET_MENU_PERMISSION', true);
      }
    },
    // 用户退出
    logout({
      commit,
      state,
      dispatch
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          removeToken();
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    // remove token
    resetToken({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    },
  },
};
