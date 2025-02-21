<template>
  <div class="mix-echarts">
    <div class="chart-box" ref="echart"></div>
  </div>
</template>

<script>
// import echarts from "echarts";
export default {
  methods: {
    initChart() {
      //初始化echarts
    },
    setEcharts() {
      var category = [];
      var dottedBase = +new Date();
      var lineData = [];
      var barData = [];

      for (var i = 0; i < 20; i++) {
        var date = new Date((dottedBase += 3600 * 24 * 1000));
        category.push(
          [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-")
        );
        var b = Math.random() * 200;
        var d = Math.random() * 200;
        barData.push(b);
        lineData.push(d + b);
      }

      // option
      this.option = {
        backgroundColor: "#344154",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["数据趋势", "当前数据"],
          textStyle: {
            color: "#ccc"
          }
        },
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: "#ccc"
            }
          }
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: "#ccc"
            }
          }
        },
        series: [
          {
            name: "数据趋势",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 15,
            data: lineData
          },
          {
            name: "当前数据",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#14c8d4" },
                  { offset: 1, color: "#43eec6" }
                ])
              }
            },
            data: barData
          },

          {
            name: "总数据",
            type: "pictorialBar",
            symbol: "rect",
            itemStyle: {
              normal: {
                color: "#0f375f"
              }
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            z: -10,
            data: lineData
          }
        ]
      };
      this.echart = echarts.init(this.$refs.echart);
      this.echart.setOption(this.option);
    },
    resizeChart() {
      //自适应
      this.echart ? this.echart.resize() : "";
    }
  },
  mounted() {
    this.setEcharts();
    window.addEventListener("resize", this.resizeChart);
  },
  computed: {
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    }
  },
  watch: {
    isCollapse() {
      // 展开折叠菜单栏 自适应
      setTimeout(() => {
        console.log(this);
        this.resizeChart();
      }, 300);
    }
  },
  data() {
    return {
      option: {},
      echart: null
    };
  },
  destroyed() {
    //防止内存泄漏
    window.removeEventListener("resize", this.resizeChart);
  }
};
</script>

<style lang="scss" scoped>
.mix-echarts {
  height: 100%;
  width: 100%;
}
.chart-box {
  height: 100%;
  width: 100%;
}
</style>
