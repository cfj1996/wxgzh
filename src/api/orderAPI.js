/*
 * @class   信用卡申请产生订单 api
 * @author  Dennis Lei
 * @date    19.04.11
 */

import http from '../common/http'

export default {
  /*
   * 信用卡申请产品创建订单
   * @param params { catalog: 1}
   * @param successCallback
   */
  createApplyCreditCardOrder(params, successCallback) {
    http.request('/m/order/create', {
      data: params,
      success: successCallback
    })
  },
  /*
   * 获取信用卡订单列表
   * @param params
   * @param successCallback
   */
  fetchOrderList(params, page, successCallback) {
    http.request('/m/order/findPaged', {
      data: params,
      page,
      success: successCallback
    })
  },
  /*
   * 移动信用卡订单到不同的列表【待审核，回收箱】
   * @param params { catalog: 1}
   * @param successCallback
   */
  moveCreditCardOrder(params, successCallback) {
    http.request('/m/order/move', {
      data: params,
      success: successCallback
    })
  }
}

