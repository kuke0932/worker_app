/**
 *
 * @author LiuChaoqun
 * @create 2018-07-30 15:03
 **/
import request from '@/utils/request'
import qs from 'qs'

/**
 * 登录
 * @param loginName
 * @param password
 */
export function loginByUsername (loginName, password) {
  const data = {
    loginName,
    password
  }
  return request({
    url: '/app/app/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 * 登出
 */
export function logout () {
  return request({
    url: '/app/app/logout',
    method: 'post'
  })
}

/**
 * 获取用户信息
 * @param token
 */
export function getUserInfo (token) {
  return request({
    url: '/app/app/getUserInfo',
    method: 'get'
  })
}

/**
 * 修改密码
 * @param oldPassword
 * @param newPassword
 */
export function changePassword (oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/app/app/updatePassword',
    method: 'post',
    data: qs.stringify(data)
  })
}
