import request from '@/utils/request'

export function getAllCommentList(params) {
  return request({
    url: '/admin/allcomment',
    method: 'get',
    params
  })
}
