import Layout from '@/layout'

// 普通用户的路由权限
const commonRoutes = [
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
        path: 'add',
        name: 'ArticleAdd',
        component: () => import('@/views/article/add'),
        meta: { title: '添加文章' }
      },
      {
        path: 'details/:id/:title',
        name: 'ArticleDetails',
        component: () => import('@/views/article/details'),
        meta: { title: '文章详情' },
        props: true,
        hidden: true
      },
      {
        path: 'update',
        name: 'ArticleUpdate',
        component: () => import('@/views/article/update'),
        meta: { title: '修改文章' },
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default commonRoutes
