import router, { resetRouter } from './router'
import store from './store'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/404'] // 白名单

// 路由守卫
router.beforeEach(async(to, from, next) => {
  // 开始进度条
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // 获取token
  const hasToken = store.getters.token

  if (hasToken) {
    if (to.path === '/login') {
      // 有token代表用户已经登录了，直接跳到首页
      next({ path: '/' })
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        // 如果有用户名，则直接放行
        next()
      } else {
        try {
          // 获取用户信息
          await store.dispatch('user/getInfo')

          resetRouter()

          store.getters.routes.forEach((item) => {
            router.addRoute(item)
          })

          next()
        } catch (error) {
          // 清除token
          await store.dispatch('user/resetToken')

          // 重定向到登录页面，并加上请求字符串记录用户是从哪个页面跳转到登录页的方便登录后跳转到对应的页面
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    /* 没有token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 在白名单里面，放行
      next()
    } else {
      // 无权限访问，重定向到登录页面，并加上请求字符串记录用户是从哪个页面跳转到登录页的方便登录后跳转到对应的页面
      next(`/login?redirect=${to.path}`)
    }
  }

  // 手动关闭一次，解决手动切换地址时，进度条不关闭的问题
  NProgress.done()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
