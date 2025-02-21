// import Vue from 'vue';
// import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   component: () => import('@/views/Main.vue'),
  //   children: [
  //     {
  //       path: '/',
  //       name: 'home',
  //       component: () => import('@/views/Home/Home')
  //     },
  //     {
  //       path: 'DataManage',
  //       name: 'DataManage',
  //       component: () => import('@/views/DataManage/DataManage')
  //     },
  //     {
  //       path: 'user',
  //       name: 'user',
  //       component: () => import('@/views/UserManage/UserManage')
  //     },
  //     {
  //       path: 'page1',
  //       name: 'page1',
  //       component: () => import('@/views/Other/Page1')
  //     },
  //     {
  //       path: 'page2',
  //       name: 'page2',
  //       component: () => import('@/views/Other/Page2')
  //     }
  //   ]
  // },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

export default router;
