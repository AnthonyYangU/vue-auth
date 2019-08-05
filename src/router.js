import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path:'/',
      component:resolve => require(['./views/Home.vue'],resolve),
      children:[
        {
            path: '/dashboard',
            component: resolve => require(['./components/Dashboard.vue'], resolve),
            meta: { title: '系统首页' }
        },
        {
          path: '/table',
          component: resolve => require(['./components//MyTable.vue'], resolve),
          meta: { title: '基础表格' }
        },
        {
          // vue-schart组件
          path: '/charts',
          component: resolve => require(['./components/BaseCharts.vue'], resolve),
          meta: { title: 'schart图表' }
        },
        {
          path: '/404',
          component: resolve => require(['./components/404.vue'], resolve),
          meta: { title: '404' }
        },
        {
            path: '/403',
            component: resolve => require(['./components/403.vue'], resolve),
            meta: { title: '403' }
        }        
      ]
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
