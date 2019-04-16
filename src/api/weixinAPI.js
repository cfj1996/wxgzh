/*
 * @class   微信 api
 * @author  行云流水
 * @date    17.08.21
 */
import http from '../common/http'

export default {
  /**
   * 试用后关注微信二维码
   * @param params
   * @param callback
   */
  getTrialQRCode(params, successCallback) {
    http.request('/m/weixin/getTrialQRCode', {
        data: params,
        success: successCallback
      }
    )
  },

  /**
   * 支付后关注微信二维码
   * @param params
   * @param callback
   */
  getPayQRCode(params, successCallback) {
    http.request('/m/weixin/getPayQRCode', {
        data: params,
        success: successCallback
      }
    )
  },
  /**
   * 支付后关注充电宝微信二维码
   * @param params
   * @param callback
   */
  getQRCode(params, successCallback) {
    http.request('/m/weixin/getQRCode', {
        data: params,
        success: successCallback
      }
    )
  },
  /**
   * 获取JS签名
   */
  signJS(params, successCallback) {
    http.request('/m/weixin/signJS', {
        data: params,
        success: successCallback
      }
    )
  },

  /**
   * 支付前关注微信二维码
   * @param params
   * @param callback
   */
  getPrepayQRCode(params, successCallback) {
    http.request('/m/weixin/getPrepayQRCode', {
        data: params,
        success: successCallback
      }
    )
  },
  /**
   * 微信上传图片
   * @param params
   * @param callback
   * @param host
   */
  wxUploadImg(params, successCallback){
    let iParams = {
    }
    params = params || {}
    Object.assign(iParams, params)
    http.request('/m/attachment/wxUploadImage', {
      data: iParams,
      success: successCallback
    })
  },
}

