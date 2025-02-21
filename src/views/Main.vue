<template>
  <el-container class="m-container">
    <div
      :class="{ 'm-active': $store.state.tab.showAside }"
      class="showTop"
      @click="showTest($event)"
    ></div>
    <el-aside width="210px" :class="{ active: $store.state.tab.showAside }">
      <common-aside></common-aside>
    </el-aside>
    <div
      class="m-container-section"
      :class="{ active: $store.state.tab.isCollapse }"
    >
      <div class="header">
        <common-header></common-header>
        <common-tag></common-tag>
      </div>
      <el-main class="m-main" style="overflow-x: hidden;">
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </el-main>
    </div>
  </el-container>
</template>

<script>
import CommonHeader from "../components/CommonHeader";
import CommonAside from "../components/CommonAside";
import CommonTag from "../components/CommonTag";

export default {
  components: {
    CommonHeader,
    CommonAside,
    CommonTag
  },
  methods: {
    showTest(e) {
      e.stopPropagation();
      this.$store.commit("changeCollapse");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu {
  border: none;
}
.active {
  z-index: 100;
  left: 0;
  transition: all 0.3s linear;
}
</style>
