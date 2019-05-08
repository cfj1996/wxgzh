/*
 * @class   会员state
 * @author  行云流水
 * @date    17.05.22
 */

import userAPI from '../../api/userAPI'

// initial state
let state = {
  user: {},
  auth: {},
  weiXin: {},
  logined: false
}

// getters
const getters = {
  user: state => state,
  auth: state => state,
  logined: state => state
}

// actions
const actions = {
  login({commit}, params) {
    params = params || {}
    return new Promise((resolve, reject) => {
      userAPI.login(params, function (res) {
        userAPI.signin({
          requestToken: res.data.requestToken
        }, function (res) {
          //登录成功后先清空一下用户信息
          commit('CLEAR_USER')
          //设置token
          commit('SET_TOKEN', res.data)
          resolve(res)
        })
      })
    })
  },

  signin({commit}) {
    return new Promise((resolve, reject) => {
      let token=sessionStorage.getItem("requestToken")
      userAPI.signin({
        requestToken: token
      }, function (res) {
        commit('SET_TOKEN', res.data)
        resolve(res)
      })
    })
  },

  reg({commit}, params) {
    params = params || {}
    return new Promise((resolve, reject) => {
      userAPI.reg(params, function (res) {
        userAPI.signin({
          requestToken: res.data.requestToken
        }, function (res) {
          //注册成功后先清空一下用户信息
          commit('CLEAR_USER')
          commit('SET_TOKEN', res.data)
          resolve(res)
        })
      })
    })
  },

  logout({commit}) {
    return new Promise((resolve, reject) => {
      userAPI.logout(function (res) {
        commit('CLEAR_USER')
        commit('REMOVE_TOKEN')
        resolve(res)
      })
    })
  },

  /**
   * 获取账号信息
   * @param commit
   * @return {Promise<any>}
   */
  getUserDetails({commit}) {
    return new Promise((resolve, reject) => {
      userAPI.getDetails({}, function (res) {
        /** todo 返回数据如下：
        {
          id: "1", //用户Id
          displayName: "行云流水", // 微信昵称
          employeeNo: "10000", // 工号
          weixinAccountNo: "xxxxx", // 微信账号
          weixinQRCode: "http://xxxx.jpg", // 微信号二维码链接
          level: "1", // 用户等级(1=普通会员，2=实习专员，3=专员，4=经理，5=银行家，6=战略家，7=合伙人)
          identityId: "1", // 实名认证Id
          identity: {
            realName: "张三", // 真实姓名
            IDCardNo: "44098xxx", // 身份证号码
            mobile: "136xxxx", //手机号码
            IDCardFrontPicture: "http://xxx.jpg", // 身份证正面照
            IDCardHandPicture: "http://xxx.jpg" // 手持身份证照
          }
        }*/
        // res.data.level = 3  // 自己设置的等级
        sessionStorage.setItem("user", JSON.stringify(res.data||[]))
        commit('SET_USER_DETAILS', res.data)
        console.log('获取用户基本信息')
        resolve(res)
      })
    })
  },

  /**
   * 获取账号信息
   * @param commit
   * @return {Promise<any>}
   */
  setUserDetail({commit}, data) {
    commit('SET_USER_DETAILS', data)
  },

  saveAvatar({commit}, params) {
    params = params || {}
    return new Promise((resolve, reject) => {
      userAPI.saveAvatar(params, function (res) {
        resolve(res)
      })
    })
  },
}

// mutations
const mutations = {
  SET_USER_DETAILS(state, data) {
    state.user = Object.assign({}, state.user, data) // 需要赋予一个新对象，才会触发具体组件中的compute中属性变化
    let _data = data.weixin
    if (data.platform) {
      _data = data.platform
    }
    if(_data && _data.shortName) {
      window.COMPANY_NAME = _data.shortName
      window.WEIXIN_NAME = _data.accountName
      window.APP_TYPE = _data.appType // 100=微信,200=支付宝
    }
  },

  CLEAR_USER(state) {
    state.user = {}
  },

  SET_TOKEN(state, data) {
    state.auth = Object.assign({
      expiredTime: new Date().getTime() + data['expiresIn'] * 1000
    }, state.auth, data) // 需要赋予一个新对象，才会触发具体组件中的compute中属性变化

    sessionStorage.setItem("session", JSON.stringify(state.auth))

    state.logined = true
  },

  REMOVE_TOKEN(state) {
    state.auth = {}

    sessionStorage.removeItem('session')

    state.logined = false
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
