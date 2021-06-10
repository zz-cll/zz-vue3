import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    component:()=> import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
    redirect: '/home',
    children:[
      {
        path:'/home',
        name:'home',
        component:()=> import(/* webpackChunkName: "Home" */ '../page/home.vue'),
        meta: { title: '首页',keepAlive:false },
      },
      {
        path:'/Administration',
        name:'Administration',
        component:()=> import(/* webpackChunkName: "Home" */ '../page/Administration.vue'),
        meta: { title: '管理',keepAlive:false },
      },
      {
        path:'/Setting',
        name:'Setting',
        component:()=> import(/* webpackChunkName: "Home" */ '../page/Setting.vue'),
        meta: { title: '设置',keepAlive:false },
      },
      {
        path:'/one',
        name:'one',
        component:()=> import(/* webpackChunkName: "Home" */ '../page/1.vue'),
        meta: { title: '一级',keepAlive:false },
      },
      {
        path:'/two',
        name:'two',
        component:()=> import(/* webpackChunkName: "Home" */ '../page/2.vue'),
        meta: { title: '二级',keepAlive:false },
      },
      {
        path:'/three',
        name:'three',
        component:()=> import(/* webpackChunkName: "Home" */ '../page/3.vue'),
        meta: { title: '三级',keepAlive:false },
      },
      {
        path:'/four',
        name:'four',
        component:()=> import(/* webpackChunkName: "Home" */ '../page/4.vue'),
        meta: { title: '四级',keepAlive:false },
      },
      {
        path:'/five',
        name:'five',
        component:()=> import(/* webpackChunkName: "Home" */ '../page/5.vue'),
        meta: { title: '五级',keepAlive:false },
      },
      {
        path:'/ceshi',
        name:'ceshi',
        component:()=> import(/* webpackChunkName: "Home" */ '../page/ceshi.vue'),
        meta: { title: '测试',keepAlive:false },
      }
    ]
  },
  {
    path: '/login',
    component: import(/* webpackChunkName: "Home" */ '../views/login.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// // 限制无token访问
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token")
  if (to.path === '/login') return next()
  if (token) return next();
  else return next("/login")
});

export default router
