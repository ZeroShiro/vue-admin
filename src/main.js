// import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//glable
import '@/assets/scss/reset.scss';
import '@/assets/scss/index.scss';
import http from '@/api/config.js';
import './mock';
//element
import ELEMENT from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
// Vue.use(ELEMENT);
Vue.prototype.$http = http;
Vue.prototype.$bus = new Vue();

router.beforeEach((to, from, next) => {
  store.commit('getToken');
  store.commit('getInfo');
  let token = store.state.user.token;
  if (!token && to.name !== 'login') {
    next({ name: 'login' });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router);
    // store.commit('selectMenu', JSON.parse(Cookies.get('curMenu')));
    store.commit('getSelectMenu');
  }
}).$mount('#app');
