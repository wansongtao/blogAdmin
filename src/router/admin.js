import Layout from '@/layout'

// 管理员路由权限
const adminRoutes = [
  {
    path: '/article',
    name: 'Article',
    component: Layout,
    meta: { title: '文章管理', icon: 'form' },
    redirect: '/article/list',
    children: [
      {
        path: 'list',
        name: 'ArticleList',
        component: () => import('@/views/article/index'),
        meta: { title: '文章列表' }
      },
      {
        path: 'check',
        name: 'ArticleCheck',
        component: () => import('@/views/article/check'),
        meta: { title: '文章审核' }
      },
      {
        path: 'add',
        name: 'ArticleAdd',
        component: () => import('@/views/article/add'),
        meta: { title: '添加文章' }
      },
      {
        path: 'details',
        name: 'ArticleDetails',
        component: () => import('@/views/article/details'),
        meta: { title: '文章详情' },
        hidden: true
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