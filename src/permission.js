import router from './router'
import { Notification  } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })



const needLoginRouter = [];

router.beforeEach((to, from, next) => {
  NProgress.start();
  const hasToken = localStorage.getItem('token');
  if (hasToken) {
    next()
  } else {
    if (needLoginRouter.indexOf(to.path) !== 0) {
      next()
    } else {
      Notification.warning('请登录')
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})




