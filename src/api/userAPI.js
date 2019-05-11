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
   * 会员商注册
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
  /*
   * 我的收入
   * @param successCallback
   */
  userIncome(successCallback) {
    http.request('/m/fund/count', {
      success: successCallback
    })
  },
  /*
   * 我的客户数
   * @param successCallback
   */
  userCustomer(successCallback) {
    http.request('/m/customer/count', {
      success: successCallback
    })
  },

  /*
   * 直推/团队业务收入列表
   */
  findDirectPaged(params, page, successCallback) {
    http.request('/m/fund/findPaged', {
      data: params,
      page,
      sorts: [{'property': '_fund.createdDate', 'order': 'DESC'}],
      success: successCallback
    })
  },
  /*
   * 团队业务奖励
   */
  findTeamPaged(page, successCallback) {
    http.request('/m/fund/findTeamPaged', {
      page,
      success: successCallback
    })
  },
  /*
  * 提交保存身份证正反面
  **/
  saveIDCardPicture(params, successCallback) {
    http.request('/m/member/saveIDCardPicture', {
      data: params,
      success: successCallback
    })
  },
  /*
  * 用户是否上传身份证图片，审核状态
  **/
  getIdentity(fn) {
    http.request('/m/member/getIdentity', {
      success: fn
    })
  },
  /*
  * 保存用户二维码
  * */
  severwm(params, successCallback) {
    http.request('/m/member/update', {
      data: params,
      success: successCallback
    })
  },
  /*
   * 团队成员的详细信息
   * */
  statsCount(params, successCallback) {
    http.request('/m/customer/statsCount', {
      data: params,
      success: successCallback
    })
  },
// /m/customer/findPaged
  /*
  * 客户列表
  * */
  teamFindPaged(params, page, successCallback, filters) {
    http.request('/m/customer/findPaged', {
      data: params,
      page,
      filters,
      success: successCallback
    })
  },
  /*
  * 修改个人信息验证手机号
  * */
  PhoneAuthCode(params, successCallback) {
    http.request('/m/auth/validatePhoneAuthCode', {
      data: params,
      success: successCallback
    })
  },
  /*
   * 提现到钱包
   * */
  withdraw(params, successCallback) {
    http.request('/m/fund/withdraw', {
      data: params,
      success: successCallback
    })
  },
  /*
  * 帮助中心
  * */
  help(params, successCallback) {
    http.request('/m/help/find', {
      method: 'get',
      data: params,
      success: successCallback
    })
  },
  /*
* 进度查询
* */
  schedule(successCallback) {
    http.request('/m/product/findBank', {
      method: 'get',
      success: successCallback
    })
  },
  /*
* 进度查询是否需要图片验证码
* */
  createView(params, successCallback) {
    http.request('/m/scheduler/createView', {
      data: params,
      success: successCallback
    })
  },
  /*
  * 查询进度短信验证码
  * */
  getSmsCode(params, successCallback) {
    http.request('/m/scheduler/getSmsCode', {
      data: params,
      success: successCallback
    })
  },
  /*
  * 查询进度
  * */
  pustQuery(params, successCallback) {
    http.request('/m/scheduler/query', {
      data: params,
      success: successCallback
    })
  },
  /*
  * 已提现列表
  * */
  findWithdrawPaged(page, successCallback) {
    http.request('/m/fund/findWithdrawPaged', {
      page,
      success: successCallback
    })
  },
  /*
  * 已经提现金额
  * */
  countWithdrew(successCallback) {
    http.request('/m/fund/countWithdrew', {
      success: successCallback
    })
  },
  /*
  * 客服列表
  * */
//  /m/agent/listCustomerService
  listCustomerService(fn){
    http.request('/m/agent/listCustomerService', {
      success: fn
    })
  },
  /*
  * 用户模块管理
  * */
}

