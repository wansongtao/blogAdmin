import request from '@/utils/request'

export function getMessageList(params) {
  return request({
    url: '/admin/getmessage',
    method: 'get',
    params
  })
}

export function delMessage(data) {
  return request({
    url: '/admin/delmessage',
    method: 'post',
    data
  })
}

export function checkMessage(data) {
  return request({
    url: '/admin/checkmessage',
    method: 'post',
    data
  })
}
