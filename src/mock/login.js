import Mock from "mockjs";
const home = {
  path: "/",
  name: "home",
  lable: "首页",
  icon: "s-home",
  url: "Home/Home"
};
const DataManage = {
  path: "/DataManage",
  name: "DataManage",
  lable: "表单提交",
  icon: "suitcase",
  url: "DataManage/DataManage"
};
const users = {
  path: "/user",
  name: "user",
  lable: "用户管理",
  icon: "user",
  url: "UserManage/UserManage"
};
const ech = {
  path: "/ech",
  name: "ech",
  lable: "数据分析",
  icon: "s-data",
  url: "MixEcharts/MixEcharts"
};
const quill = {
  path: "/quill",
  name: "quill",
  lable: "文本编辑",
  icon: "document",
  url: "Quill/Quill"
};
const iframe = {
  path: "/iframe",
  name: "iframe",
  lable: "插件预览",
  icon: "view",
  url: "Iframe"
};
const order = {
  lable: "设置",
  name: "page",
  icon: "setting",
  children: [
    {
      path: "/page1",
      lable: "权限管理",
      name: "page1",
      icon: "setting",
      url: "Other/Page1"
    },
    {
      path: "/page2",
      lable: "页面测试2",
      name: "page2",
      icon: "setting",
      url: "Other/Page2"
    }
  ]
};

let userlist = [
  {
    code: 20000,
    data: {
      menu: [
        {
          path: "/",
          name: "home",
          lable: "首页",
          icon: "s-home",
          url: "Home/Home"
        },
        {
          path: "/DataManage",
          name: "DataManage",
          lable: "表单提交",
          icon: "suitcase",
          url: "DataManage/DataManage"
        },
        {
          path: "/user",
          name: "user",
          lable: "用户管理",
          icon: "user",
          url: "UserManage/UserManage"
        },
        {
          path: "/ech",
          name: "ech",
          lable: "数据分析",
          icon: "s-data",
          url: "MixEcharts/MixEcharts"
        },
        {
          path: "/quill",
          name: "quill",
          lable: "文本编辑",
          icon: "document",
          url: "Quill/Quill"
        },
        {
          path: "/iframe",
          name: "iframe",
          lable: "插件预览",
          icon: "view",
          url: "Iframe"
        },
        {
          lable: "设置",
          name: "page",
          icon: "setting",
          children: [
            {
              path: "/page1",
              lable: "权限管理",
              name: "page1",
              icon: "setting",
              url: "Other/Page1"
            },
            {
              path: "/page2",
              lable: "其他测试",
              name: "page2",
              icon: "setting",
              url: "Other/Page2"
            }
          ]
        }
      ],
      info: {
        edit: "可管理",
        rank: "超级管理员",
        name: "Admin",
        username: "admin",
        password: "admin",
        explication: "Super Administrator. Have access to view all pages.",
        infoList: {
          IsDataManage: "表单提交",
          Isusers: "用户管理",
          Isech: "数据分析",
          Isquill: "文本编辑",
          Isiframe: "插件预览",
          Isorder: "设置"
        },
        token: Mock.Random.guid()
      },
      message: "获取成功"
    }
  },
  {
    code: 20000,
    data: {
      menu: [
        {
          path: "/",
          name: "home",
          lable: "首页",
          icon: "s-home",
          url: "Home/Home"
        },
        {
          path: "/user",
          name: "user",
          lable: "用户管理",
          icon: "user",
          url: "UserManage/UserManage"
        },
        {
          path: "/DataManage",
          name: "DataManage",
          lable: "表单提交",
          icon: "suitcase",
          url: "DataManage/DataManage"
        }
      ],
      info: {
        edit: "可管理",
        rank: "普通用户",
        name: "test1",
        username: "test1",
        password: "123",
        explication: "General user. no editing rights",
        infoList: {
          IsDataManage: "表单提交",
          Isusers: "用户管理"
        },
        token: Mock.Random.guid()
      },
      message: "获取成功"
    }
  }
];
function addMenus(info) {
  let menu = [];
  if (info.infoList.IsDataManage) {
    menu.push(DataManage);
  }
  if (info.infoList.Isusers) {
    menu.push(users);
  }
  if (info.infoList.Isech) {
    menu.push(ech);
  }
  if (info.infoList.Isquill) {
    menu.push(quill);
  }
  if (info.infoList.Isiframe) {
    menu.push(iframe);
  }
  if (info.infoList.Isorder) {
    menu.push(order);
  }
  menu.unshift(home);
  return menu;
}
export default {
  // 登陆获取信息
  getMenu: config => {
    const { username, password } = JSON.parse(config.body);
    // 先判断用户是否存在
    let user = {};
    userlist.filter(item => {
      if (
        item.data.info.username == username &&
        item.data.info.password == password
      ) {
        user = item;
        return user;
      }
    });

    if (!user) {
      return {
        code: -999,
        data: {
          message: "账户或密码错误"
        }
      };
    } else {
      return user;
    }
  },
  // 添加人员
  setMenu: config => {
    const { info } = JSON.parse(config.body);
    console.log(info);
    let menu = [];

    if (info.infoList.IsDataManage) {
      menu.push(DataManage);
    }
    if (info.infoList.Isusers) {
      menu.push(users);
    }
    if (info.infoList.Isech) {
      menu.push(ech);
    }
    if (info.infoList.Isquill) {
      menu.push(quill);
    }
    if (info.infoList.Isiframe) {
      menu.push(iframe);
    }
    if (info.infoList.Isorder) {
      menu.push(order);
    }
    menu.unshift(home);
    userlist.push({
      code: 20000,
      data: {
        menu: menu,
        info: info,
        token: Mock.Random.guid(),
        message: "获取成功"
      }
    });
  },
  // 修改权限
  restMenu: config => {
    const { info, falg } = JSON.parse(config.body);
    // 是否修改了节点

    if (falg) {
      let menu = addMenus(info);
      userlist.some(item => {
        if (item.data.info.token == info.token) {
          item.data.info = info;
          item.data.menu = menu;
        }
      });
    } else {
      userlist.some(item => {
        if (item.data.info.token == info.token) {
          item.data.info = info;
          return true;
        }
      });
    }
    return {
      code: 20000,
      message: "成功"
    };
  },
  //获取信息
  getInfoMenu: config => {
    let data = userlist.map(item => {
      return item.data.info;
    });
    return data;
  },
  delMenu: config => {
    const { id } = JSON.parse(config.body);
    userlist = userlist.filter(item => item.data.info.token !== id);
  }
};
