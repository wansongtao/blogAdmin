import Layout from '@/layout'

// 超级管理员路由权限
const sAdminRoutes = [
  {
    path: '/users',
    name: 'Users',
    component: Layout,
    meta: { title: '用户管理', icon: 'user' },
    redirect: '/users/list',
    children: [
      {
        path: 'list',
        name: 'UsersList',
        component: () => import('@/views/users/index'),
        meta: { title: '用户列表' }
      },
      {
        path: 'edit',
        name: 'Edituser',
        component: () => import('@/views/users/edit'),
        meta: { title: '用户信息' }
      }
    ]
  },
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
    redirect: '/comment/check',
    children: [
      {
        path: 'check',
        component: () => import('@/views/comments/index'),
        name: 'Check',
        meta: { title: '评论管理', icon: 'message' }
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
