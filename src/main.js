import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui'
// import './styles.scss'

import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(ElementUI)

Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    const signal = store.state.signal
    if (to.meta.requiresAuth) { // 判断该路由是否需要登录权限
      if (signal) { // 通过vuex state获取当前的token是否存在
        next()
      } else {
        console.log('该页面需要登陆')
        next({
          path: '/403',
        //   query: {redirect: '/dashboard'} // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    } else {
      next()
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
