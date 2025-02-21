<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="$route.name"
    class="el-menu-vertical-demo"
    background-color="#262c33"
    text-color="#fff"
    active-text-color="#409EFF"
    v-if="show"
  >
    <h3 class="min-name">MYS</h3>
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :class="$route.name == item.name ? 'is-active' : ''"
      :key="item.path"
      :ss="$route.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span>{{ item.lable }}</span>
    </el-menu-item>

    <el-submenu index="index" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.lable }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subitem.path"
          v-for="(subitem, index) in item.children"
          :key="index"
          :class="$route.name == subitem.name ? 'is-active' : ''"
          @click="clickMenu(subitem)"
          >{{ subitem.lable }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  computed: {
    noChildren() {
      //展示没有子集列表
      return this.$store.state.tab.menu.filter((item) => !item.children);
    },
    hasChildren() {
      //展示有子集列表
      return this.$store.state.tab.menu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    meun() {
      return this.$store.state.tab.menu;
    },
    show() {
      return this.$store.state.tab.showAside;
    },
    showTop() {
      return this.$store.state.tab.showTop;
    },
    isHeight() {
      return this.$store.state.tab.isHeight;
    },
  },
 
  data() {
    return {};
  },
  methods: {
    clickMenu(item) {
      //传入hander列表信息 展示面包屑
      this.$router.push({ name: item.name });
      this.$store.commit('selectMenu', item);

      if (this.showTop) {
        this.$store.commit('showAside', false);
        return
      }


      if (this.isHeight <= 760) {
        this.$store.commit('showAside', false);
        return
      }

      // if (this.isMobile2 <= 768 && !this.isMobile()) {
      //   this.$store.commit('setIsCollapse', false);
      // }else{
      // }
      // console.log(item);
    },
  },
  mounted() {
    this.$bus.$on('handleClick', this.clickMenu); //hader tag标签传递
  },
};
</script>

<style lang="scss" scoped>
.is-active {
  color: rgb(64, 158, 255) !important;
}
// #active {
//   color: rgb(64, 158, 255) ;
// }
// #is {
//   color: rgb(255, 255, 255) !important;
// }
</style>
