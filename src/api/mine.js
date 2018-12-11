/**
 *
 * @author LiuChaoqun
 * @create 2018-07-30 15:55
 **/
import request from '@/utils/request'
// import qs from 'qs'

/**
 * 帮助页面工序列表
 */
export function listProcess () {
  return request({
    url: '/app/app/listProcess',
    method: 'get'
  })
}

/**
 * 帮助详情
 * @params processCode 工序编码
 * @params carTypeCode 车型编码
 * 帮助详情
 */
export function getHelp (processCode, carTypeCode) {
  const data = {
    processCode,
    carTypeCode
  }
  return request({
    url: '/app/app/getHelp',
    method: 'get',
    params: data
  })
}

/**
 * 工作量统计
 * @params beginDate
 * @params endDate
 */
export function listStatistics (beginDate, endDate) {
  const data = {
    beginDate,
    endDate
  }
  return request({
    url: '/app/app/listStatistics',
    method: 'get',
    params: data
  })
}

/**
 * 工作量明细
 */
export function listStatisticsDetail (beginDate, endDate, processNo, fb, produceType, pageNum, pageSize) {
  const data = {
    beginDate, endDate, processNo, fb, produceType, pageNum, pageSize
  }
  return request({
    url: '/app/app/listStatisticsDetail',
    method: 'get',
    params: data
  })
}
