/*
 * @class   信用卡 api
 * @author  Dennis Lei
 * @date    19.04.02
 */

import http from '../common/http'

export default {
  /*
   * 获取信用卡产品数据
   * @param params { catalog: 1}
   * @param successCallback
   */
  getCreditCards(params, successCallback) {
    http.request('/m/product/find', {
      data: params,
      success: successCallback
    })
  },
  /*
   * 获取信用卡产品详情
   * @param params { id 产品Id}
   * @param successCallback
   */
  getCardDetail(params, successCallback) {
    http.request('/m/product/getDetails', {
      data: params,
      success: successCallback
    })
  },
  /*
   * 获取信用卡产品海报详情
   * @param params { id 产品Id}
   * @param successCallback
   */
  getCreditCardPosterDetail(params, successCallback) {
    http.request('/m/campaign/getCreditCard', {
      data: params,
      success: successCallback
    })
  },
  /*
 * 自定义信用卡产品海报
 * @param params { id 产品Id}
 * @param successCallback
 */
  generateCreditCardPoster(params, successCallback) {
    http.request('/m/campaign/generateCreditCardPoster', {
      data: params,
      success: successCallback
    })
  }
}

