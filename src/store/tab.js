import Cookie from "js-cookie";
export default {
  state: {
    menu: [],
    //面包屑展示
    currentMenu: {},
    //"首页" 防止'/'展示
    showHome: true,
    //移动端展示
    showTop: false,
    showAside: false,
    //收起展开菜单栏
    isCollapse: false,
    //tab标签显示
    tabsList: [
      {
        path: "/",
        name: "home",
        lable: "首页",
        icon: "coin"
      }
    ]
  },
  mutations: {
    //是否移动端
    showTop(state, val) {
      state.showTop = val;
    },
    //显示隐藏Aside
    showAside(state, val) {
      state.showAside = val;
    },
    selectMenu(state, val) {
      //首页面包屑
      if (val.name !== "home") {
        state.showHome = false;
        state.currentMenu = val;
        //联动tab标签
        let result = state.tabsList.find(value => value.name === val.name);
        //防止多次生成导航标签
        !result && state.tabsList.push(val);
        Cookie.set("curMenu", state.tabsList);
      } else {
        state.currentMenu = "";
        state.showHome = true;
        Cookie.remove("curMenu");
      }
    },
    getSelectMenu(state) {
      //刷新防止tag标签消失
      if (!Cookie.get("curMenu")) {
        return;
      }
      let tabsList = JSON.parse(Cookie.get("curMenu"));
      //  防止刷新消失meun
      state.tabsList = tabsList;
    },
    closeTab(state, val) {
      //查找索引,删除tablist记录
      let result = state.tabsList.findIndex(value => value.name === val.name);
      state.tabsList.splice(result, 1);
    },
    changeCollapse(state) {
      //收起展开菜单栏
      //是否移动端
      if (!state.showTop) {
        state.isCollapse = !state.isCollapse;
        state.showAside = true;
        return;
      }
      state.showAside = !state.showAside;
      state.isCollapse = false;
    },
    clearMenu(state) {
      //清除menu 防止在次登陆
      state.menu = [];
      state.tabsList = [
        {
          path: "/",
          name: "home",
          lable: "首页",
          icon: "coin"
        }
      ];
      state.currentMenu = {};
      Cookie.remove("menu");
      Cookie.remove("curMenu");
    },
    setMenu(state, val) {
      //动态设置菜单栏
      state.menu = val;
      Cookie.set("menu", JSON.stringify(val));
    },
    // 全局方法 刷新获取menu
    addMenu(state, router) {
      if (!Cookie.get("menu")) {
        return;
      }
      let menu = JSON.parse(Cookie.get("menu"));
      //  防止刷新消失meun
      state.menu = menu;
      let currentMenu = [
        {
          path: "/",
          component: () => import(`@/views/Main`),
          children: []
        }
      ];
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`@/views/${item.url}`);
            return item;
          });
          currentMenu[0].children.push(...item.children);
        } else {
          item.component = () => import(`@/views/${item.url}`);
          currentMenu[0].children.push(item);
        }
      });
      router.addRoutes(currentMenu);
    }
  },
  actions: {}
};
