// import store from '@/store'
// import { getToken } from '@/utils/auth'
import axios from 'axios'
import Vue from 'vue'
import { Toast, Dialog } from 'vant'
Vue.use(Toast, Dialog)

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  config.headers['x-auth-token'] = window.plus.storage.getItem('token') // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  if (!config.headers['Content-Type'] && !config.headers['content-Type'] && !config.headers['Content-type'] && !config.headers['content-type']) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  }
  const params = {}
  if (config.params) {
    for (const data in config.params) {
      const value = config.params[data]
      if (!(typeof value === 'string' && value === '')) {
        params[data] = value
      }
    }
  }
  config.params = params
  Toast.loading({
    duration: 0,
    forbidClick: true,
    loadingType: 'spinner',
    message: '页面加载中'
  })
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    Toast.clear()
    return response
  },
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  error => {
    Toast.clear()
    console.log('err' + error)// for debug
    if (error.response.data.status === 401) {
      Dialog.alert({
        title: '网络超时！',
        message: '您登录超时，可以取消继续留在该页面，或者重新登录？'
      }).then(() => {
        // on close
      })
    } else {
      Dialog.alert({
        message: error.response.data.message || error.message
      }).then(() => {
        // on close
      })
    }
    return Promise.reject(error)
  })

export default service
