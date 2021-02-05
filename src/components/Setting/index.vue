<template>
  <div class="side-setting">
    <SettingItem title="主题色">
      <ColorCheckboxGroup :multiple="false"
                          :default-values="[palettes.indexOf(theme.color)]"
                          @change="(values, colors) => setTheme({...theme, color: colors[0]})">
        <ColorCheckbox v-for="(color, index) in palettes"
                       :key="index"
                       :color="color"
                       :value="index" />
      </ColorCheckboxGroup>
    </SettingItem>
  </div>
</template>
<script>
import SettingItem from "./SettingItem";
import { ColorCheckbox } from "@/components/CheckBox";
const ColorCheckboxGroup = ColorCheckbox.Group;

//引入vuex
import { mapState, mapMutations } from "vuex";
export default {
  name: "Setting",
  components: {
    SettingItem,
    ColorCheckboxGroup,
    ColorCheckbox,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("setting", ["palettes", "theme"]),
  },
  methods: {
    ...mapMutations("setting", ["setTheme"]),
  },
};
</script>

<style lang="less" scoped>
.side-setting {
  background-color: @base-bg-color;
}
</style>

