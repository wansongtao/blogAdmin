import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/admin/getuserinfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'get'
  })
}

export function editUserInfo(data) {
  return request({
    url: '/admin/useredit',
    method: 'post',
    data
  })
}

export function getUserList(params) {
  return request({
    url: '/admin/getuserlist',
    method: 'get',
    params
  })
}
