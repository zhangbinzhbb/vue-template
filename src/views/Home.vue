<template>
  <div class="home">
    <img alt="Vue logo"
         src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import * as user from "@/api/user"

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  created() {
    user.getUserInfo().then((res) => {
      console.log("res-->", res)
    })
  },
  methods: {

  }
};
</script>
