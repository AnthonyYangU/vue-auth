import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path:'/',
      component:resolve => require(['./views/Home.vue'],resolve),
      children:[
        {
            path: '/dashboard',
            component: resolve => require(['./components/Dashboard.vue'], resolve),
            meta: {requiresAuth: true}
        },
        {
          path: '/table',
          component: resolve => require(['./components//MyTable.vue'], resolve),
          meta: {requiresAuth: true}
        },
        {
          // vue-schart组件
          path: '/charts',
          component: resolve => require(['./components/BaseCharts.vue'], resolve),
          meta: {requiresAuth: true}
        },
        {
            path:'/upload',
            component: resolve => require(['./components/Upload.vue'], resolve),
            meta: {requiresAuth: true}
        }
        
      ]
    },
    {
      path: '/403',
      component: resolve => require(['./components/403.vue'], resolve),
    },
    {
      path: '/404',
      component: resolve => require(['./components/404.vue'], resolve),
    },
    {
      path: '/login',
      component: resolve => require(['./views/Login.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
