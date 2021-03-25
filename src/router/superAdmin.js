import Layout from '@/layout'

// 超级管理员路由权限
const sAdminRoutes = [
  {
    path: '/users',
    name: 'Users',
    component: Layout,
    children: [
      {
        path: 'edit',
        name: 'Edituser',
        component: () => import('@/views/users/index'),
        meta: { title: '用户信息', icon: 'user' }
      }
    ]
  },
  {
    path: '/article',
    name: 'Article',
    component: Layout,
    children: [
      {
        path: 'edit',
        name: 'Articleedit',
        component: () => import('@/views/article/index'),
        meta: { title: '文章管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/comment',
    name: 'Comment',
    component: Layout,
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
    name: 'Category',
    component: Layout,
    children: [{
      path: 'edit',
      component: () => import('@/views/category/index'),
      name: 'Edit',
      meta: { title: '栏目管理', icon: 'edit' }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default sAdminRoutes
