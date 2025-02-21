<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
   
    this.checkDevice();
    window.addEventListener('resize', this.checkDevice); // 监听窗口大小变化
  },
  methods: {
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    checkDevice() {
      this.$store.commit('setIsHeight', window.innerWidth);

      if(window.innerHeight > 760 && !this.isMobile()){
        this.$store.commit('showTop', false);

    
        this.$store.commit('showAside', true);
        return;
      }
      if(window.innerHeight <= 760 && !this.isMobile()){
        this.$store.commit('showTop', false);

      
        this.$store.commit('showAside', false);
        return;
      }

      if (this.isMobile()){
        this.$store.commit('showTop', true);

   
        this.$store.commit('showAside', false);
        return
      }

      // if (this.isMobile()) {
      //   this.$store.commit('showTop', true);
      //   this.$store.commit('showAside', false);
      // } else {
      //   this.$store.commit('showTop', false);
      //   this.$store.commit('showAside', true);
      // }

   
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkDevice); // 移除监听
  },
};
</script>

<style lang="scss">
#app {
  height: 100vh;
}
</style>
