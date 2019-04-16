/*
 * @class   用户相关api
 * @author  行云流水
 * @date    17.05.22
 */

import http from '../common/http'

export default {
  /*
   * 用户名和密码登录
   * @param params
   * @param successCallback
   */
  login(params, successCallback) {
    // 处理为form提交
    let oFormData = new FormData()
    for (let key in params) {
      oFormData.append(key, params[key])
    }

    http.request('/m/login', {
      data: oFormData,
      requiresAuth: false,
      success: successCallback
    })
  },

  /*
   * 获取访问token
   * @param params
   * @param successCallback
   */
  signin(params, successCallback) {
    http.request('/m/signin', {
      method: 'get',
      data: params,
      requiresAuth: false,
      success: successCallback
    })
  },

  /*
   * 退出登录
   * @param params
   */
  logout(params) {
    http.request('/m/logout', {
      method: 'get',
      data: params
    })
  },

  /*
   * 获取用户信息
   * @param params
   * @param successCallback
   */
  getDetails(params, successCallback) {
    http.request('/m/member/getDetails', {
      data: params,
      success: successCallback
    })
  },

  /*
   * 用户注册
   * @param params
   * @param successCallback
   */
  memberRegiste(params, successCallback) {
    http.request('/m/member/register', {
      data: params,
      success: successCallback
    })
  },

  /*
   * 代理商注册
   * @param params
   * @param successCallback
   */
  agentRegiste(params, successCallback) {
    http.request('/m/agent/register', {
      data: params,
      success: successCallback
    })
  },
  /*
   * 发送短信验证码带图片验证码
   * @param params
   * @param successCallback
   */
  getPhoneAuthCode(params, successCallback) {
    http.request('/m/security/getPhoneAuthCode', {
      data: params,
      success: successCallback
    })
  },
  /*
   * 修改手机号
   * @param params
   * @param successCallback
   */
  changeMobile(params, successCallback) {
    http.request('/m/member/changeMobile', {
      data: params,
      success: successCallback
    })
  },
  /*
   * 发送短信验证码
   * @param params
   * @param successCallback
   */
  sendPhoneAuthCode(params, successCallback) {
    http.request('/m/security/sendPhoneAuthCode', {
      data: params,
      success: successCallback
    })
  },
  /**
   * 短信验证码 验证
   * @param params
   * @param successCallback
   */
  validatePhoneAuthCode(params, successCallback) {
    http.request('/m/auth/validatePhoneAuthCode', {
      data: params,
      success: successCallback
    })
  },
  /*
   * 获取授权列表
   * @param params
   * @param successCallback
   */
  fetchAuthorizationList(params, page, successCallback) {
    http.request('/m/aprv/findAgentPaged', {
      data: params,
      page,
      success: successCallback
    })
  },
}

