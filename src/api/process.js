/**
 *
 * @author LiuChaoqun
 * @create 2018-07-31 10:57
 **/
import request from '@/utils/request'
import qs from 'qs'

/**
 * 获取工人工序
 */
export function listProcessByLoginName () {
  return request({
    url: '/app/app/listProcessByLoginName',
    method: 'get'
  })
}

/**
 * 根据产品编号获取订单信息
 * @param productNo
 * @param processNo
 */
export function getOrderInfo (productNo, processNo) {
  const data = {
    productNo,
    processNo
  }
  return request({
    url: '/app/app/getOrderInfo',
    method: 'get',
    params: data
  })
}

/**
 * 开始工序
 * @param orderNo     订单号
 * @param productNo   产品编号
 * @param materialId  物料id
 * @param processNo   工序编号
 * @param processSort 工序顺序
 */
export function startProcess (orderNo, productNo, materialId, processNo, processSort) {
  const data = {
    orderNo, productNo, materialId, processNo, processSort
  }
  return request({
    url: '/app/app/startProcess',
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 * 结束工序
 * @param orderNo
 * @param id
 * @param processNo
 * @param productNo
 */
export function endProcess (orderNo, id, processNo, productNo) {
  const data = { orderNo, id, processNo, productNo }
  return request({
    url: '/app/app/endProcess',
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 * 获取车型列表
 */
export function listAllCarType () {
  return request({
    url: '/app/app/listAllCarType',
    method: 'get'
  })
}

/**
 * 领料
 * @
 */
export function getMaterial (materialId, storageLocationCode) {
  const data = {
    materialId,
    storageLocationCode
  }
  return request({
    url: '/app/app/getMaterial',
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 * 发货
 * @jsonData
 */
export function send (productNo) {
  const data = { productNo }
  return request({
    url: '/app/app/send',
    method: 'get',
    params: data
  })
}

/**
 * 扫描维修
 * @jsonData
 */
export function scanRepair (productNo) {
  const data = { productNo }
  return request({
    url: '/app/app/scanRepair',
    method: 'get',
    params: data
  })
}

/**
 * 开始维修
 * @jsonData
 */
export function startRepair (productNo) {
  const data = { productNo }
  return request({
    url: '/app/app/startRepair',
    method: 'post',
    params: data
  })
}

/**
 * 结束维修
 * @jsonData
 */
export function endRepair (productNo) {
  const data = { productNo }
  return request({
    url: '/app/app/endRepair',
    method: 'post',
    params: data
  })
}
