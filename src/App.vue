<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    }
  },
  mounted() {
    if (this.isMobile()) {
      this.$store.commit("showTop", true);
      this.$store.commit("showAside", false);
    } else {
      this.$store.commit("showTop", false);
      this.$store.commit("showAside", true);
    }
  }
};
</script>

<style lang="scss">
#app {
  height: 100vh;
}
</style>
