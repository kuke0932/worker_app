import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    loginStatus: '',
    message: '',
    token: getToken(),
    name: '',
    process: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_LOGINSTATUS: (state, loginStatus) => {
      state.loginStatus = loginStatus
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_MESSAGE: (state, message) => {
      state.message = message
    },
    SET_NAME: (state, name) => {
      state.name = name
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername ({ commit }, userInfo) {
      const username = userInfo.workerNumber.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          if (data.status === 200) {
            commit('SET_STATUS', data.status)
            commit('SET_MESSAGE', data.message)
            commit('SET_LOGINSTATUS', true)
            commit('SET_NAME', username)
            window.plus.storage.setItem('needChangePwd', 'false')
          }
          if (data.status === 251) {
            commit('SET_STATUS', data.status)
            window.plus.storage.setItem('needChangePwd', 'true')
          }
          commit('SET_TOKEN', data.data)
          setToken(data.data)
          const date = new Date()
          const startTime = date.getTime()
          window.plus.storage.setItem('token', data.data)
          window.plus.storage.setItem('startTime', startTime + '')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject(new Error('error'))
          }
          const data = response.data.data
          commit('SET_NAME', data.name)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then((response) => {
          const data = response.data
          if (data.status === 200) {
            commit('SET_TOKEN', '')
            commit('SET_LOGINSTATUS', false)
          }
          window.plus.storage.setItem('token', '')
          window.plus.storage.setItem('startTime', '')

          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
