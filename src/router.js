import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// 解决 NavigationDuplicated 报错！！！
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: '/config',
      name: 'config',
      component: () => import('./views/Config.vue')
    }
  ]
})
