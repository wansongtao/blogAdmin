import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/users',
    component: Layout,
    redirect: '/users/edituser',
    children: [
      {
        path: 'edituser',
        name: 'Edituser',
        component: () => import('@/views/users/index'),
        meta: { title: '用户信息', icon: 'user' }
      }
    ]
  },

  {
    path: '/article',
    component: Layout,
    redirect: '/article/edit',
    children: [
      {
        path: 'editarticle',
        name: 'Articleedit',
        component: () => import('@/views/article/index'),
        meta: { title: '文章管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/comment',
    component: Layout,
    redirect: '/comment/check',
    children: [
      {
        path: 'check',
        component: () => import('@/views/comments/index'),
        name: 'Check',
        meta: { title: '评论审核', icon: 'message' }
      }
    ]
  },

  {
    path: '/category',
    component: Layout,
    redirect: '/category',
    children: [{
      path: 'edit',
      component: () => import('@/views/category/index'),
      name: 'Edit',
      meta: { title: '栏目管理', icon: 'edit' }
    }]
  },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
