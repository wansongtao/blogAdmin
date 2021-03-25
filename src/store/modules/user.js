import {
  login,
  logout,
  getUserInfo
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import { resetRouter } from '@/router'
import sAdminRoutes from '@/router/superAdmin'
import adminRoutes from '@/router/admin'
import commonRoutes from '@/router/common'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    // 将getDefaultState()方法返回的对象中的所有可枚举属性，分配到目标对象state
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROUTES: (state, roles) => {
    let routes = []

    if (roles === 'common') {
      routes = commonRoutes
    } else if (roles === 'admin') {
      routes = adminRoutes
    } else if (roles === 'sAdmin') {
      routes = sAdminRoutes
    } else {
      routes = [{ path: '*', redirect: '/404', hidden: true }]
    }

    state.routes = routes
  }
}

const actions = {
  // 用户登录 commit = context.commit
  login({
    commit
  }, userInfo) {
    const {
      userAccount,
      userPassword
    } = userInfo
    return new Promise((resolve, reject) => {
      // 调用api/user里的login方法
      login({
        userAccount: userAccount.trim(),
        userPassword: userPassword.trim()
      }).then(data => {
        // 调用mutations里的SET_TOKEN方法将token存入state中
        commit('SET_TOKEN', data.token)

        // 将token存入cookie中
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(data => {
        const {
          name,
          avatar
        } = data

        // 修改state里的name和avatar
        commit('SET_NAME', name)
        commit('SET_AVATAR', process.env.VUE_APP_BASE_API + avatar)
        commit('SET_ROUTES', 'sAdmin')
        sessionStorage.users = JSON.stringify(data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit
  }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        sessionStorage.removeItem('users')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeToken() // 删除cookie
      commit('RESET_STATE') // 调用mutations里的REST_STATE方法重置state对象
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
