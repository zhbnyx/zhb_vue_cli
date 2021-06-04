import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './permission.js'
import './assets/common/fonts/iconfont.css'

Vue.config.productionTip = false

Vue.use(ElementUI)


//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//   const role = localStorage.getItem('username');
//   console.log(role);
//   if (!role && to.path !== '/login') {
//     console.log(909090);
//     next('/login');
//   }
// })


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
