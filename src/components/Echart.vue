<template>
  <div ref="echart"></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: []
        };
      }
    },
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    options() {
      //返回需要坐标轴的数据
      return this.isAxisChart ? this.axisOption : this.noAxisOption;
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    }
  },
  watch: {
    chartData: {
      handler() {
        this.initChart();
      },
      deep: true
    },
    isCollapse() {
      // 展开折叠菜单栏 自适应
      setTimeout(() => {
        this.resizeChart();
      }, 300);
    }
  },
  data() {
    return {
      // 初始化的dom
      echart: null,
      axisOption: {
        //header 部分
        legend: {},
        //提示
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: [],
          axisLine: {
            //坐标轴颜色
            lineStyle: {
              color: "#4e86f2"
            }
          }
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#4e86f2"
              }
            }
          }
        ],
        series: [],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
          "#e5cf0d",
          "#97b552",
          "#95706d",
          "#dc69aa",
          "#07a2a4",
          "#9a7fd1",
          "#588dd5",
          "#f5994e",
          "#c05050",
          "#59678c",
          "#c9ab00",
          "#7eb00a",
          "#6f5553",
          "#c14089"
        ]
      },
      noAxisOption: {
        title: {
          text: "本月订单统计图",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left"
        },
        series: [],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
          "#e5cf0d",
          "#97b552",
          "#95706d",
          "#dc69aa",
          "#07a2a4",
          "#9a7fd1",
          "#588dd5",
          "#f5994e",
          "#c05050",
          "#59678c",
          "#c9ab00",
          "#7eb00a",
          "#6f5553",
          "#c14089"
        ]
      }
    };
  },
  methods: {
    initChart() {
      //先处理数据
      this.initChartData();
      //初始化echarts
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        this.echart = echarts.init(this.$refs.echart);
        this.echart.setOption(this.options);
      }
    },
    initChartData() {
      //处理props中传递的chart数据
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
        this.noAxisOption.series = this.chartData.series;
      }
    },
    resizeChart() {
      //自适应
      this.echart ? this.echart.resize() : "";
    }
  },
  mounted() {
    window.addEventListener("resize", this.resizeChart);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeChart);
  }
};
</script>

<style lang="scss" scoped></style>
