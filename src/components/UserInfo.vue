<template>
  <el-col :xs="24" :sm="24" :lg="6" class="home-left">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div class="user-info">
            <span>你好！欢迎登陆MYS后台管理系统</span>
            <div class="user-photo">
              <img :src="img" alt />
              <span class="name">{{ $store.state.user.info.name }}</span>
            </div>
            <div class="rank">
              <p>{{ $store.state.user.info.rank }}</p>
              <div>
                <span>登陆时间：</span>
                <span>{{ getDate }}</span>
              </div>
              <div>
                <span>登陆地点：</span>
                <span class="city">{{ LocationProvince }}</span>
                <span>{{ LocationCity }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div class="new">
            <span>今日新上架(数据皆为mock)</span>
            <el-table :data="tableList" border height="381">
              <el-table-column
                v-for="(val, index) in tableLable"
                :key="index"
                :prop="index"
                :label="val"
              ></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
// import BMap from 'BMap';
export default {
  props: ["img", "tableList", "tableLable"],
  data() {
    return {
      LocationProvince: "获取定位中 ",
      LocationCity: "---"
    };
  },
  computed: {
    getDate() {
      let d = new Date();
      var str = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
      return str;
    }
  },
  created() {
    this.getLocation();
  },
  methods: {
    // 移动端定位
    getLocation() {
      const self = this;
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // self.$store.dispatch("setLocation", data);
          self.LocationProvince = data.formattedAddress;
          // self.$store.dispatch("setAddress", data.formattedAddress);
        }

        function onError(data) {
          // 定位出错    使用ip定位可能有误
          self.getLngLatLocation();
        }
      });
    },
    getLngLatLocation() {
      const self = this;
      AMap.plugin("AMap.CitySearch", function() {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            // console.log(result);
            AMap.plugin("AMap.Geocoder", function() {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              });

              var lnglat = result.rectangle.split(";")[0].split(",");
              geocoder.getAddress(lnglat, function(status, data) {
                if (status === "complete" && data.info === "OK") {
                  // result为对应的地理位置详细信息
                  localStorage.setItem("city", result.city);
                  self.LocationProvince = data.regeocode.formattedAddress;
                }
              });
            });
          }
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.city {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
