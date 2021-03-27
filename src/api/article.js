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

export function delArticle(params) {
  return request({
    url: '/admin/delArticle',
    method: 'get',
    params
  })
}

export function getAllArticle(params) {
  return request({
    url: '/admin/allarticle',
    method: 'get',
    params
  })
}

export function checkArticleState(data) {
  return request({
    url: '/admin/checkarticle',
    method: 'post',
    data
  })
}

export function reductionArticle(params) {
  return request({
    url: '/admin/reduction',
    method: 'get',
    params
  })
}
