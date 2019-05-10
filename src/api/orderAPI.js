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
  fetchOrderList(params, page, successCallback, filters) {
    http.request('/m/order/findPaged', {
      data: params,
      page,
      filters,
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
  },
  /*
  * 获取用户订单数
  * @param params
  * @param successCallback
  */
  count(successCallback) {
    http.request('/m/order/count', {
      success: successCallback
    })
  },
  /*
   *  获取专属客服
   * @param successCallback
   */
  getCustomerService(successCallback) {
    http.request('/m/agent/getCustomerService', {
      success: successCallback
    })
  },
  /*
   * 会员海报
   * @param successCallback
   */
  getAgent(successCallback) {
    http.request('/m/campaign/getAgent', {
      success: successCallback
    })
  },
  /*
  * 会员海报生成
  * @param successCallback
  */
  generateAgentPoster(successCallback) {
    http.request('/m/campaign/generateAgentPoster', {
      success: successCallback
    })
  },
  /*
   * 已经实名后成为会员的接口
   * @param successCallback
   */
  enroll(params, successCallback){
    http.request('/m/agent/enroll',  {
      data: params,
      success: successCallback
    })
  }
}

