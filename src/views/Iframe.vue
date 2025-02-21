<template>
  <div>
    <iframe
      src="https://ext.dcloud.net.cn/publisher?id=290655"
      id="ifm"
      frameborder="0"
      style="position:absolute;top:100px;"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    changeMobsfIframe(num = 200, num2 = 100) {
      const ifm = document.getElementById("ifm");
      const deviceWidth = window.innerWidth;
      const deviceHeight = window.innerHeight;
      if (this.showTop) {
        num = 0;
      }
      ifm.style.width = Number(deviceWidth) - num + "px"; //数字是页面布局宽度差值
      ifm.style.height = Number(deviceHeight) - num2 + "px"; //数字是页面布局高度差
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    showTop() {
      return this.$store.state.tab.showTop;
    }
  },
  watch: {
    isCollapse: {
      handler(val) {
        if (val) {
          this.changeMobsfIframe(64);
        } else {
          this.changeMobsfIframe();
        }
      }
    }
  },
  mounted() {
    /**
     * iframe-宽高自适应显示
     */
    let _this = this;
    this.changeMobsfIframe();
    window.onresize = function() {
      _this.changeMobsfIframe();
    };
  }
};
</script>
