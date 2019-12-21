import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/firstPage'
    },
    {
      path:'/',
      component:resolve => require(['./views/Home.vue'],resolve),
      children:[
        {
            path: '/dashboard',
            component: resolve => require(['./components/Dashboard.vue'], resolve),
            meta: {requiresAuth: true,title:'个人中心'}
        },
        // {
        //   path: '/table',
        //   component: resolve => require(['./components//MyTable.vue'], resolve),
        //   meta: {requiresAuth: true,title:'数据表格'}
        // },
        {
            path:'/upload',
            component: resolve => require(['./components/Upload.vue'], resolve),
            meta: {requiresAuth: true,title:'论文检测'}
        },
        // {
        //   path:'/mycharts',
        //   component:resolve =>require(['./components/charts.vue'],resolve),
        //   meta: {requiresAuth:true,title:'图表信息'}
        // },
        {
          path:'/tabs',
          component:resolve =>require(['./components/Tabs.vue'],resolve),
          meta: {requiresAuth:true,title:'通知消息'}
        },
        // {
        //   path:'/geo',
        //   component:resolve=>require(['./components/geo.vue'],resolve),
        //   meta: {requiresAuth:true,title:'地理显示'}
        // },
        {
          path:'/paperForm',
          component:() =>import('./components/paperForm.vue'),
          meta: {requiresAuth:true,title:'论文格式'}
        },
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
      component: resolve => require(['./components/Login.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    },
    // {
    //   path: '/frontHead',
    //   component: () => import(/* webpackChunkName: "about" */ './components/frontHead.vue')
    // },
    {
      path:'/firstPage',
      component:() =>import('./components/firstPage.vue')
    },
    {
      path:'/test2',
      component:() =>import('./components/test2.vue')
    },
    // {
    //   path:'/firstPageHead',
    //   component:()=>import('./components/firstPageHead')
    // }
  ]
})
