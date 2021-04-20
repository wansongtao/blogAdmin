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

export function updateCategoryName(params) {
  return request({
    url: '/admin/updatecategory',
    method: 'get',
    params
  })
}

export function addCategory(data) {
  return request({
    url: '/admin/addcategory',
    method: 'post',
    data
  })
}

export function delCategory(categoryId) {
  return request({
    url: `/admin/delcategory?categoryId=${categoryId}`,
    method: 'get'
  })
}

export function updateArticle(data) {
  return request({
    url: '/admin/updatearticle',
    method: 'post',
    data
  })
}

export function searchArticleList(params) {
  return request({
    url: '/admin/searcharticle',
    method: 'get',
    params
  })
}
