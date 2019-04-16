/*
 * @class   payment api
 * @author  行云流水
 * @date    18.02.07
 */

import http from '../common/http'

export default {

  /**
   * 获取支付签名与vr支付等
   * @param params
   * @param callback
   */
  pay(params, successCallback,completeCallback) {
    http.request('/m/payment/wx/pay', {
        data: params,
        success: successCallback,
        complete: completeCallback
      }
    )
  },
  /**
   * 获取支付签名与vr支付等（充电宝）
   * @param params
   * @param callback
   */
  payCDB(params, successCallback,completeCallback) {
    http.request('/m/payment2/wx/pay', {
        data: params,
        success: successCallback,
        complete: completeCallback
      }
    )
  },
  /**
   * 完成已经预支付订单继续支付
   * @param params
   * @param callback
   */
  payPreOrder(params, successCallback,completeCallback) {
    http.request('/m/payment/wx/payPreOrder', {
        data: params,
        success: successCallback,
        complete: completeCallback
      }
    )
  },
  /**
   * 创建预支付订单
   * @param params
   * @param callback
   * push deviceId,priceId
   * 返回 prepayOrderId
   */
  createPrepayOrder(params, successCallback) {
    http.request('/m/payment/wx/createPrepayOrder', {
        data: params,
        success: successCallback
      }
    )
  },
  /**
   * 支付完成后回调获取Return信息（是否注册）
   * @param params
   * @param callback
   */
  paymentReturn(params, successCallback) {
    http.request('/m/payment/wx/return', {
        data: params,
        success: successCallback
      }
    )
  },
  /**
   * 支付完成后回调获取Return信息（是否注册）（充电宝）
   * @param params
   * @param callback
   */
  paymentReturnCDB(params, successCallback) {
    http.request('/m/payment2/wx/return', {
        data: params,
        success: successCallback
      }
    )
  },

  /**
   * 取消支付
   * @param params
   * @param callback
   */
  paymentCancel(params, successCallback) {
    http.request('/m/payment/wx/cancel', {
        data: params,
        success: successCallback
      }
    )
  },
  /**
   * 创建广告订单
   * @param params
   * @param callback
   * 参数为设备id deviceId，价格方案 priceId
   */
  createADOrder(params, successCallback) {
    http.request('/m/payment/wx/createADOrder', {
        data: params,
        success: successCallback,
      }
    )
  },
  /**
   * 支付宝预支付授权（充电宝）
   * @param params
   * @param callback
   */
  zhimaPayCDB(params, successCallback, completeCallback) {
    http.request('/m/payment2/zhima/pay', {
        data: params,
        success: successCallback,
        complete: completeCallback
      }
    )
  },
  /**
   * 支付宝预支付授权成功,同步回调
   * @param params
   * @param callback
   * 参数为设备deviceId 充电宝设备ID
   */
  zhimaPayCDBReturn(params, successCallback) {
    http.request('/m/payment2/zhima/return', {
        data: params,
        success: successCallback,
      }
    )
  },
  /**
   * 支付宝预支付授权成功,同步回调
   * @param params
   * @param callback
   * 参数为设备deviceId 充电宝设备ID
   */
  zhimaPayCDBReturn(params, successCallback) {
    http.request('/m/payment2/zhima/return', {
        data: params,
        success: successCallback,
      }
    )
  }
}

