import Mock from 'mockjs';
//图表对应数据
let chartlist = [];
export default {
  getHomeData: () => {
    for (let i = 0; i < 7; i++) {
      chartlist.push(
        Mock.mock({
          手机: Mock.Random.float(130, 500, 0, 2),
          电脑: Mock.Random.float(130, 500, 0, 2),
          生活用品: Mock.Random.float(130, 500, 0, 2),
          零食: Mock.Random.float(130, 500, 0, 2),
          水果蔬菜: Mock.Random.float(130, 500, 0, 2),
          家具电器: Mock.Random.float(130, 500, 0, 2)
        })
      );
    }
    return {
      data: {
        // home left
        DataMange: [
          {
            name: "手机",
            numPrice: Mock.Random.float(130, 8000, 0, 2), //浮点数 最大最小值 最大小数位
            value: Mock.Random.natural(10, 100)
          },
          {
            name: "电脑",
            numPrice: Mock.Random.float(130, 8000, 0, 2),
            value: Mock.Random.natural(10, 100)
          },
          {
            name: "生活用品",
            numPrice: Mock.Random.float(130, 8000, 0, 2),
            value: Mock.Random.natural(10, 100)
          },
          {
            name: "零食",
            numPrice: Mock.Random.float(130, 8000, 0, 2),
            value: Mock.Random.natural(10, 100)
          },
          {
            name: "水果蔬菜",
            numPrice: Mock.Random.float(130, 8000, 0, 2),
            value: Mock.Random.natural(10, 100)
          },
          {
            name: "家具电器",
            numPrice: Mock.Random.float(130, 8000, 0, 2),
            value: Mock.Random.natural(10, 100)
          }
        ],
        // 折线图
        LineChartData: {
          date: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          data: chartlist
        },
        // 饼图
        stockData: [
          {
            name: "手机",
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: "电脑",
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: "生活用品",
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: "零食",
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: "水果蔬菜",
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: "家具电器",
            value: Mock.Random.float(1000, 10000, 0, 2)
          }
        ],
        // 柱状图
        userData: [
          {
            date: "周一",
            new: Mock.Random.integer(30, 200),
            active: Mock.Random.integer(200, 1000)
          },
          {
            date: "周二",
            new: Mock.Random.integer(30, 200),
            active: Mock.Random.integer(200, 1000)
          },
          {
            date: "周三",
            new: Mock.Random.integer(30, 200),
            active: Mock.Random.integer(200, 1000)
          },
          {
            date: "周四",
            new: Mock.Random.integer(30, 200),
            active: Mock.Random.integer(200, 1000)
          },
          {
            date: "周五",
            new: Mock.Random.integer(30, 200),
            active: Mock.Random.integer(200, 1000)
          },
          {
            date: "周六",
            new: Mock.Random.integer(30, 200),
            active: Mock.Random.integer(200, 1000)
          },
          {
            date: "周日",
            new: Mock.Random.integer(30, 200),
            active: Mock.Random.integer(200, 1000)
          }
        ]
      }
    };
  },
  getHomeList: () => {
    return {
      //header
      data: {
        DataHomeList: [
          {
            name: "今日已支付订单",
            value: Mock.Random.natural(100, 1000),
            icon: "s-goods",
            color: "#4FA8DF",
            id: 1
          },
          {
            name: "今日收藏数",
            value: Mock.Random.natural(20, 200),
            icon: "star-on",
            color: "#4FA8DF",
            id: 2
          },
          {
            name: "已上架商品",
            value: Mock.Random.natural(100, 500),
            icon: "s-shop",
            color: "#4FA8DF",
            id: 3
          },
          {
            name: "库存预警商品",
            value: Mock.Random.natural(10, 20),
            icon: "warning",
            color: "#4FA8DF",
            id: 4
          },
          {
            name: "送货中商品",
            value: Mock.Random.natural(50, 100),
            icon: "location",
            color: "#4FA8DF",
            id: 5
          },
          {
            name: "意见反馈",
            value: Mock.Random.natural(10, 30),
            icon: "s-comment",
            color: "#4FA8DF",
            id: 6
          }
        ]
      }
    };
  }
};
