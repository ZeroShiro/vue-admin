<template>
  <div id="header-container">
    <div class="l-header">
      <el-button
        size="mini"
        icon="el-icon-s-fold"
        @click="changeMenu"
      ></el-button>
      <router-link
        :to="{ name: 'home' }"
        tag="span"
        class="crumb-home"
        :class="{ active: !showHome }"
        >首页</router-link
      >
      <el-breadcrumb separator="/" class="crumb">
        <el-breadcrumb-item :to="{ name: 'home' }" :class="{ active: showHome }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ name: current.name }">
          {{ current.lable }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-header">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <div class="img-box">
            <img src="../assets/images/user.jpeg" class="user" alt />
            <i class="el-icon-caret-bottom"></i>
          </div>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>首页</el-dropdown-item>
          <el-dropdown-item>
            <a href="https://github.com/ZeroShiro">GitHub</a>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      userImg: "../assets/images/user.jpeg"
    };
  },
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu,
      showHome: state => state.tab.showHome
    })
  },

  methods: {
    changeMenu() {
      //展开收起菜单栏
      this.$store.commit("changeCollapse");
    },
    logOut() {
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$store.commit("clearInfo");

      this.$router.push({ name: "login" });
      // location.href = 'http://47.111.246.32/';
    }
  }
};
</script>

<style lang="scss" scoped></style>
