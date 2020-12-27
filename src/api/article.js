import request from '@/utils/request'

export function getCategory() {
  return request({
    url: '/admin/getcategory',
    method: 'get'
  })
}
