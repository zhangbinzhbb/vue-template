<template>
  <div class="home">
    <div class="drawer-section"
         :class="visible ? 'drawer-section-open' : ''"
         @click="showDrawer">
      <a-drawer title="设置主题"
                width="276px"
                placement="right"
                :closable="false"
                :mask="false"
                :after-visible-change="afterVisibleChange"
                :visible="visible"
                @close="onClose">
        <Setting />
      </a-drawer>
      <a-icon :type="visible ? 'close' : 'setting'" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import * as user from "@/api/user";
import Setting from "@/components/Setting";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Setting,
  },
  data() {
    return {
      showSetting: false,
      visible: false,
    }
  },
  created() {
    user.getUserInfo().then((res) => {
      console.log("res-->", res);
    });
  },
  methods: {
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    showDrawer() {
      this.visible = !this.visible;
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.drawer-section {
  right: 0;
  top: 34%;
  position: fixed;
  z-index: 100;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: @primary-color;
  color: @base-bg-color;
  border-radius: 5px 0 0 5px;
  box-shadow: -2px 0 8px @shadow-color;
  transition: right 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  i {
    font-size: 26px;
  }
}

.drawer-section-open {
  right: 276px !important;
}
</style>