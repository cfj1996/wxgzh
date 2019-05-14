// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import 'normalize.css'// A modern alternative to CSS resets
import routes from './router/index'
import Router from 'vue-router'
import store from './store/index'
import App from './App'
import clipboard from 'clipboard';
// config 引入
import config from './config'
// 添加微信全局组件
import addWechet from './components/addBuddy'

Vue.prototype.config = config
Vue.component('addWechat', addWechet)
Vue.use(Router)

// 处理移动端click事件300毫秒延迟
import FastClick from 'fastclick'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    if (window.FastClick) {
      window.FastClick.attach(document.body);
    }
  }, false);
}

// 引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 自定义全局Dialog组件
import ZgyComponent from './module/index'
Vue.use(ZgyComponent)

// 引入mint-ui
import MintUI, {Indicator} from 'mint-ui'
Vue.use(MintUI)
//filters
import Filters from './common/filters'

// 引入axios 封装好的公共 ajax 函数
import Http from './common/http'

Vue.$http = Vue.prototype.$http = Http

// 公共方法
import Util from './common/util'

Vue.$util = Vue.prototype.$util = Util

Vue.config.productionTip = false

// AwesomeSwiper使用
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

Router.prototype.back = function () {
  window.history.go(-1)
}

const router = new Router({
  routes,
  mode: 'history',
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {x: 0, y: to.meta.savedPosition || 0}
    }
  }
})

let initializeDATA = function (to, from, next) {
  store.dispatch('getUserDetails').then((data) => {
    console.log("加载完用户信息: ", data)
    store.dispatch('getDataSet').then((data) => {
      console.log("加载完基础数据: ", data)
      store.dispatch('getUnreadInfo').then((data)=>{
        console.log("未读信息: ", data)
        store.dispatch('getUserPerm').then(data=>{
          console.log('权限', data)
          next()
        })

      })

      //关闭加载
      Indicator.close()
    })
  })
}

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.selectedTab) {
    sessionStorage.setItem('selectedTab', to.meta.selectedTab)
  } else {
    sessionStorage.removeItem('selectedTab')
  }
  let login = false;
  let requestToken = to.query.requestToken
  if (requestToken) {
    // 扫码后，后端跳转携带requestToken
    let _requestToken = sessionStorage.getItem("requestToken");
    if (requestToken == _requestToken) {
      console.log("requestToken一致");
    } else {
      login = true;
      sessionStorage.setItem("requestToken", requestToken);
      console.log("requestToken不一致");
      //白屏加载中
      Indicator.open()
      //换取正式token
      store.dispatch('signin').then((data) => {
        initializeDATA(to, from, next)
      })
    }
  }

  if (!login) {
    let user = sessionStorage.getItem('user');
    user = user ? JSON.parse(user) : null;
    console.log(to)
    if (['/confirm_applicant_info', '/bank_card_info'].includes(to.path) && (!Util.isObject(user) || !user.identity.IDCardNo)) {
      next({
        path: '/credit_card', // 重定向后的路由
        query: {}
      })
      return
    }
    if (Util.isObject(user)) {
      store.dispatch('setUserDetail', user)
      store.dispatch('setUnreadInfo', sessionStorage.getItem("read"))
      store.dispatch('setUserPerm', JSON.parse(sessionStorage.getItem("userPerm")))
    }
    // 是否需要登录
    if (to.matched.find(record => !record.meta.requireAuth)) {
      console.warn('无需登录即可访问的页面', to.path)
      next() // 确保一定调用next()
    } else {
      // this route requires auth, check if logged in
      // if not, redirect to login page
      let sessionData = sessionStorage.getItem('session');
      let session = sessionData ? JSON.parse(sessionData) : null;
      if (!session || session.expiredTime <= new Date().getTime()) {
        console.warn('您还没有登录，跳转到登录页面', to.fullPath);
        // https://segmentfault.com/a/1190000011042794
        // 这就是跳出循环的关键（因为 /login 会在进入前，又要进入beforeEach中，这样就会一直循环下去）
        if (from.path === '/login' || from.path === '/') {
          next()
        } else {
          next()
          setTimeout(() => {
            // next({
            //   path: '/login', // 重定向后的路由
            //   query: {redirect: to.fullPath} // 登录成功之后可以根据query中的内容跳转回原来的路由(页面)
            // })
          }, 1000)
        }
      } else {
        next()
      }
    }
  }
})

router.afterEach(function (transition) {
  //微信更新header
  if (transition.meta && transition.meta.title) {
    // Util.setWxTitle(transition.meta.title)
  } else {
    Util.setWxTitle(window.WEIXIN_NAME)
    Util.setWxTitle('淘个卡')
  }
})
Vue.prototype.clipboard = clipboard
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
// This is the event hub we'll use in every component to communicate between them.
Vue.$eventHub = Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()
