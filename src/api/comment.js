import request from '@/utils/request'

export function getAllCommentList(params) {
  return request({
    url: '/admin/allcomment',
    method: 'get',
    params
  })
}

export function delComment(params) {
  return request({
    url: '/admin/delcomment',
    method: 'get',
    params
  })
}

export function checkComment(data) {
  return request({
    url: '/admin/checkcomment',
    method: 'post',
    data
  })
}
