<template>
  <div class="home">
    <el-row :gutter="20">
      <!-- <user-info :img="img" :tableList="tableList" :tableLable="tableLable" :class="{ showTop: !showTop }"></user-info> -->
    </el-row>
    <el-row :gutter="20">
      <el-col
        :xs="12"
        :sm="12"
        :lg="4"
        class="num"
        v-for="item in DataList"
        :key="item.id"
      >
        <el-card shadow="hover" :body-style="{ padding: 0 }">
          <div class="detail">
            <i
              :class="`el-icon-${item.icon}`"
              :style="`color:${item.color};`"
            ></i>
            <span class="split"></span>
            <div class="text-box">
              <h5>{{ item.value }}</h5>
              <span>{{ item.name }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <user-info
        :img="img"
        :tableList="tableList"
        :tableLable="tableLable"
      ></user-info>
      <el-col :xs="24" :sm="24" :lg="18" class="home-right">
        <el-row class="chart-box-l" :gutter="20">
          <el-col :xs="24" :sm="24" :lg="12">
            <el-card>
              <Echart
                class="box"
                :chartData="echartsData.shop"
                :isAxisChart="false"
              ></Echart>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-card>
              <Echart class="box" :chartData="echartsData.user"></Echart>
            </el-card>
          </el-col>
        </el-row>
        <el-row class="chart-box-r" :gutter="20">
          <el-col :xs="24" :sm="24" :lg="24">
            <el-card>
              <Echart class="box" :chartData="echartsData.home"></Echart>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Echart from "@/components/Echart";
import userInfo from "@/components/UserInfo.vue";
export default {
  data() {
    return {
      img: require("../../assets/images/user.jpeg"),
      DataList: [],
      tableList: [],
      tableLable: {
        name: "商品",
        value: "新商品售出",
        numPrice: "总收入"
      },
      echartsData: {
        home: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        shop: {
          series: []
        },
        stock: {
          xData: [],
          series: []
        }
      }
    };
  },
  components: {
    userInfo,
    Echart
  },
  computed: {
    showTop() {
      return this.$store.state.tab.showTop;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .get("/home/getData")
        .then(res => {
          res = res.data;
          this.tableList = res.data.DataMange;
          // ---折线图数据----
          let home = res.data.LineChartData;
          //x坐标数据
          this.echartsData.home.xData = home.date;
          // series 中的一部分键名
          let keyArray = Object.keys(home.data[0]);
          //series数据设置
          keyArray.forEach(key => {
            this.echartsData.home.series.push({
              // 可处理后端的一些名字
              name: key === "book" ? "电脑" : key,
              data: home.data.map(item => item[key]),
              type: "line"
            });
          });
          return res;
        })
        .then(res => {
          // --- 柱状图 -----
          this.echartsData.user.xData = res.data.userData.map(
            item => item.date
          );
          this.echartsData.user.series.push({
            name: "新增用户",
            data: res.data.userData.map(item => item.new),
            type: "bar"
          });
          this.echartsData.user.series.push({
            name: "活跃用户",
            data: res.data.userData.map(item => item.active),
            type: "bar",
            barGap: 0
          });
          return res;
        })
        .then(res => {
          this.echartsData.shop.series.push({
            name: "本月数据",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: res.data.stockData
          });
        });
      this.$http.get("/home/getList").then(res => {
        this.DataList = res.data.data.DataHomeList;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
