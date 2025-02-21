import Cookie from "js-cookie";
export default {
  state: {
    token: "",
    info: {}
  },
  mutations: {
    setToken(state, val) {
      console.log(val);
      state.token = val;
      Cookie.set("token", val);
    },
    getToken(state) {
      state.token = Cookie.get("token");
    },
    clearToken(state) {
      state.token = "";
      Cookie.remove("token");
    },
    setInfo(state, val) {
      state.info = val;
      Cookie.set("info", JSON.stringify(val));
    },
    getInfo(state) {
      if (!Cookie.get("info")) {
        return;
      }
      let info = JSON.parse(Cookie.get("info"));
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
      Cookie.remove("info");
    }
  },
  actions: {}
};
