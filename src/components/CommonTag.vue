<template>
  <div class="tag">
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      class="tag-item"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @click="handleClick(tag)"
      @close="handleClose(tag)"
      :effect="$route.name == tag.name ? 'dark' : 'plain'"
      >{{ tag.lable }}</el-tag
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      effect: "plain"
    };
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  methods: {
    handleClose(tag) {
      //传入需要删除的标签
      this.$store.commit("closeTab", tag);
      this.$store.commit("clearCurrentMenu");
      if (tag.name === this.$route.name) {
        this.$router.push({ name: "home" });
      }
    },
    handleClick(item) {
      //同时改变面包屑
      console.log(item);
      // this.$bus.$emit("handleClick", item);
      this.$router.push({ name: item.name });
      this.$store.commit("selectMenu", item);
    }
  }
};
</script>

<style lang="scss" scoped></style>
