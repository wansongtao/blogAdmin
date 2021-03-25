import Layout from '@/layout'

// 普通用户的路由权限
const commonRoutes = [
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
  { path: '*', redirect: '/404', hidden: true }
]

export default commonRoutes
