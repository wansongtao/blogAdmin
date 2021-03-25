import Layout from '@/layout'

// 管理员路由权限
const adminRoutes = [
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
  { path: '*', redirect: '/404', hidden: true }
]

export default adminRoutes
