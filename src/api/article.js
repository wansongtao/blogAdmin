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
