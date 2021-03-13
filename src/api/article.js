import request from '@/utils/request'

export function getCategory() {
  return request({
    url: '/admin/getcategory',
    method: 'get'
  })
}

export function addArticle(data) {
  return request({
    url: 'admin/addarticle',
    method: 'post',
    data
  })
}

export function getArticleList(params) {
  return request({
    url: '/admin/getArticleList',
    method: 'get',
    params
  })
}

export function getArticleContent(params) {
  return request({
    url: '/admin/getArticleContent',
    method: 'get',
    params
  })
}
