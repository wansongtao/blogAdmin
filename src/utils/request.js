import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router/index'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 服务器基础路径，在.env.development|.env.production文件里设置
  timeout: 5000 // 设置请求超时的时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 让每个请求携带请求头, 加上Bearer
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { success, code, data, message } = response.data

    if (success) {
      return data
    }

    Message({
      message: message || '操作失败',
      type: 'error',
      duration: 2 * 1000
    })

    if (code === 500 || code === 501) {
      // 清除token后，才能跳转到登录页
      store.dispatch('user/resetToken').then(() => {
        router.push('/login')
      })
    }

    return Promise.reject(new Error(message || '服务器错误'))
  },
  error => {
    console.error('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
