import config from "@/config";
import { ADMIN } from "@/config/default";

import { getLocalSetting } from "@/utils/themeUtils/themeUtil";

const localSetting = getLocalSetting(true);
export default {
  namespaced: true,
  state: {
    palettes: ADMIN.palettes,
    ...config,
    ...localSetting,
  },
  getters: {},
  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
    },
    setLang(state, lang) {
      state.lang = lang;
    },
  },
};
