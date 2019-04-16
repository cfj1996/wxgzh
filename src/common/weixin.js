/*
 * @class   微信JS SDK方法
 * @author  行云流水
 * @date    17.06.02
 */

import { Toast, Indicator, MessageBox } from 'mint-ui'
import wxAPI from '../api/weixinAPI'
import payAPI from '../api/paymentAPI'
export default {
  /**
   * 调用微信扫一扫
   */
  scanQRCode(callback) {
    wxAPI.signJS({
      url: getSignURL()
    }, function (res) {
      wx.config({
        appId: res.data.appID, // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature,// 必填，签名，见附录1
        jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })

      wx.ready(function () {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            // 当needResult 为 1 时，resultStr扫码返回的结果
            if (res.resultStr) {
              (callback && typeof callback === 'function') && callback(res.resultStr)
            } else {
              Toast({
                message: '扫码失败，请重试',
                position: 'top'
              })
            }
          }
        })
      })
    })
  },

  //#region 调用接口前sign，config和ready
  /**
   * 需要JS签名的URL
   */
  getSignURL() {
    // 处理安卓兼容问题
    if (navigator.userAgent.indexOf('Android') > -1) {
      return location.href
    }
    return window.WX_SIGN_URL
  },
  /**
   * 使用URL去后台获取JS签名
   */
  signJS(callFn){
    // console.log('url=',this.getSignURL())
    wxAPI.signJS({
      url: this.getSignURL()
      //调试可用固定路径调试
      // url: 'http://devchongdianviph5.winbons.com/pay'
    },function (res) {
      if (callFn && typeof callFn == 'function')
        callFn(res.data)
    })
  },
  /**
   * 使用设备id和价格方案id去后台获取JS签名和支付签名
   */
  signPay(deviceId,priceId,callFn){
    // console.log('url=',this.getSignURL())
    payAPI.pay({
      deviceId: deviceId,
      priceId:priceId
    }, function (res) {
        setTimeout(() => {
          if (callFn && typeof callFn == 'function')
            callFn(res.data)
        } , 100)
    },()=>{
      Indicator.close()
    })
  },
  /**
   * 使用设备id和价格方案id去后台获取JS签名和支付签名(充电宝
   */
  signPayCDB(deviceId,callFn){
    // console.log('url=',this.getSignURL())
    payAPI.payCDB({
      deviceId: deviceId,
    }, function (res) {
      setTimeout(() => {
        if (callFn && typeof callFn == 'function')
          callFn(res.data)
      } , 100)
    },()=>{
      Indicator.close()
    })
  },
  /**
   * 使用预支付订单id去后台获取JS签名和支付签名
   */
  signPayPreOrder(prepayOrderId,callFn){
    // console.log('url=',this.getSignURL())
    payAPI.payPreOrder({
      id: prepayOrderId
    }, function (res) {
        setTimeout(() => {
      if (callFn && typeof callFn == 'function')
        callFn(res.data)
        } , 100)
    },()=>{
      Indicator.close()
    })
  },
  /**
   * 使用JSSDK前进行配置
   */
  wxConfig(res,params,callFn){
    Object.assign(res,{jsApiList:params})
    console.log('wxConfig params',res)
    wx.config({
      debug: false,
      appId: res.appID, // 必填，公众号的唯一标识
      timestamp: res.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.nonceStr, // 必填，生成签名的随机串
      signature: res.signature,// 必填，签名，见附录1
      jsApiList: res.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    wx.ready(function () {
      console.log('wx.ready')
      if (callFn && typeof callFn == 'function')
        callFn()
    })
  },
  wxPayConfig(res,callFn){
    wx.config({
      // debug: true,
      appId: res.appId, // 必填，公众号的唯一标识
      timestamp: res.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.nonceStr, // 必填，生成签名的随机串
      signature: res.paySign,// 必填，签名，见附录1
      jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    wx.ready(function () {
      console.log('wx.ready')
      if (callFn && typeof callFn == 'function')
        callFn(res)
    })
  },
  /**
   * 使用JSSDK任何接口都必须包含在ready里面，如有需要可以扩展error()
   */
  wxReady(jsApiList,callFn){
    if (callFn && typeof callFn == 'function')
    this.signJS((cofingres) => this.wxConfig(cofingres, jsApiList, ()=> callFn()))
  },
  wxPayReady(deviceId,priceId,callFn){
    if (callFn && typeof callFn == 'function')
      this.signPay(deviceId,priceId,(cofingres) => this.wxPayConfig(cofingres.payment,(res)=> callFn(res,cofingres.id)))
  },
  wxPayPreOrderReady(prepayOrderId,callFn){
    if (callFn && typeof callFn == 'function')
      this.signPayPreOrder(prepayOrderId,(cofingres) => this.wxPayConfig(cofingres.payment,(res)=> callFn(res,cofingres.id)))
  },
  wxPayReadyCDB(deviceId,callFn){

    if (callFn && typeof callFn == 'function')
      this.signPayCDB(deviceId,(cofingres) => this.wxPayConfig(cofingres.payment,(res)=> callFn(res,cofingres.id)))
  },
  // #endregion
  /* 1.success：接口调用成功时执行的回调函数。
  2.fail：接口调用失败时执行的回调函数。
  3.complete：接口调用完成时执行的回调函数，无论成功或失败都会执行。
  4.cancel：用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。
  5.trigger: 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。
  备注：不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回。
  以上几个函数都带有一个参数，类型为对象，其中除了每个接口本身返回的数据之外，还有一个通用属性errMsg，其值格式如下：
  调用成功时："xxx:ok" ，其中xxx为调用的接口名
  用户取消时："xxx:cancel"，其中xxx为调用的接口名
  调用失败时：其值为具体错误信息*/
  // #region wx提供的接口，所有接口都可以定义success，fail，complete，cancel，trigger
  /*
   * 分享给朋友圈
   * @param params
   * @param callFn
   */
  wxShare(params, callFn) {
    let jsApiList = [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage'
    ]
    this.wxReady(jsApiList, () => {
      wx.checkJsApi({
        jsApiList: [
          'checkJsApi',
          'updateTimelineShareData',
          'updateAppMessageShareData'
        ],
        success: function (res) {
          // 点击按钮扫描二维码
          if (res.checkResult.getLocation == false) {
            MessageBox.alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！', 'alert');
            return;
          } else {
            wx.onMenuShareTimeline({
              title: params.title, // 分享标题
              link: params.link, // 分享链接,将当前登录用户转为puid,以便于发展下线
              imgUrl: params.imgUrl, // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
                callFn && callFn()
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
                MessageBox.alert('取消分享给朋友圈！', 'alert')
              }
            });
            wx.onMenuShareAppMessage({
              title: params.title, // 分享标题
              link: params.link, // 分享链接,将当前登录用户转为puid,以便于发展下线
              imgUrl: params.imgUrl, // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
                callFn && callFn()
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
            wx.error(function (res) {
              // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，
              // 也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
              console.log('errrrr ', res)
              MessageBox.alert('share config error MSG: ' + res, 'alert');
            })
          }
        }
      })
    })
  },
  chooseImage(params,callFn) {
    console.log('chooseImage params==',params)
    wx.chooseImage({
      count: params.count,
      scene: params.scene,
      sizeType: params.sizeType, // 可以指定是原图还是压缩图，默认二者都有
      sourceType: params.sourceType, // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log('chooseImage success')
        if (callFn && typeof callFn == 'function')
          callFn(res)
      }
    })
  },
  uploadImage(res,params,callFn){
    setTimeout(() => {
      Indicator.open()
      wx.uploadImage({
        localId: res.localIds[0], // 图片的localID
        isShowProgressTips: params,
        success: function (uploadData) {
          if (callFn && typeof callFn == 'function')
            callFn(uploadData.serverId)// 返回图片的服务器端ID
        }
      })
    }, 100)
  },
  getLocation(type,callback,cancelCallFn){
    wx.getLocation({
      type: type,
      success: function (res) {
        (callback && typeof callback === 'function') && callback(res)
        // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        // var speed = res.speed; // 速度，以米/每秒计
        // var accuracy = res.accuracy; // 位置精度
      },
      fail: function (res) {
        //未开启定位功能
        console.error('用户未开启定位功能')
      },
      cancel: function (res) {
        (cancelCallFn && typeof cancelCallFn === 'function') && cancelCallFn()
        //用户拒绝授权获取地理位置
        console.error('用户拒绝授权获取地理位置')
      }
    })
  },
  chooseWXPay(payment,prepayOrderId,callFn){
    console.log('payment=',payment)
    wx.chooseWXPay({
      appId: payment.appId, // 必填，公众号的唯一标识
      timestamp: payment.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: payment.nonceStr, // 支付签名随机串，不长于 32 位
      package: payment.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      signType: payment.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: payment.paySign, // 支付签名
      success: function (res) {
        // 支付成功后的回调函数
        if (res.errMsg == 'chooseWXPay:ok') {
          if (callFn && typeof callFn == 'function')
            callFn(prepayOrderId)
        }
      }, //如果你按照正常的jQuery逻辑，下面如果发送错误，一定是error，那你就太天真了，当然，jssdk文档中也有提到
      fail: function(res) {
        //接口调用失败时执行的回调函数。
      },
      complete: function(res) {
        //接口调用完成时执行的回调函数，无论成功或失败或取消都会执行。
        Indicator.close()
      },
      cancel: function(res) {
        //用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。
       /* payAPI.paymentCancel({
          id: prepayOrderId
        }, function (resData) {
        })*/
      }
    })
  },
  scanQRCode(need=1, callFn){
    wx.scanQRCode({
      needResult : need, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType : ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success : function(res) {
        // Toast(JSON.stringify(res))
        if(need==1){
          let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          if(result){
            if (callFn && typeof callFn == 'function')
              callFn(result)
          }else{
            Toast('二维码问题!')
          }
        }else {
          if (callFn && typeof callFn == 'function')
            callFn(result)
        }
      }
    })
  },
  checkJsApi(joggle,callFn){
    wx.checkJsApi({
      jsApiList :joggle,
      success : function(res) {
        if (callFn && typeof callFn == 'function')
          callFn()
      }
      })
  },
  //#endregion
  //#region 自定义接口类
  wxUploadImg(serverId,callFn){
    wxAPI.wxUploadImg({
      mediaId: serverId
    }, function (res) {
      Indicator.close()
      Toast({
        message: '上传成功',
        position: 'top'
      })
      if (callFn && typeof callFn == 'function')
        callFn(res.data)
    })
  },
  /**
   * 获取支付完成的订单
   * res.orderId
   */
  paymentReturn(prepayOrderId,callFn){
    payAPI.paymentReturn({
      prepayOrderId: prepayOrderId
    }, function (resData) {
      if (callFn && typeof callFn == 'function')
        callFn(resData.data)
    })
  },
  /**
   * 获取支付完成的订单(充电宝)
   * res.orderId
   */
  paymentReturnCDB(prepayOrderId,callFn){
    payAPI.paymentReturnCDB({
      prepayOrderId: prepayOrderId
    }, function (resData) {
      if (callFn && typeof callFn == 'function')
        callFn(prepayOrderId)
    })
  },
  //#endregion
//#region 应用类
  /**
   * 微信图片上传并把图片上传到服务器上
   * @param type  相机和相册的选择，1-相册，2-相机，3-都有
   * @param callback
   */
  weixinUploadImg(type,callFn) {
    let jsApiList = ['chooseImage', 'uploadImage']
    let chooseImageCofig = {
      count: 1,
      scene: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    }
    //#region 可以指定来源是相册还是相机，默认二者都有
    if (type == 1) {
      Object.assign(chooseImageCofig, {sourceType: ['album']})
    } else if (type == 2) {
      Object.assign(chooseImageCofig, {sourceType: ['camera']})
    } else if (type == 3) {
      Object.assign(chooseImageCofig, {sourceType: ['album', 'camera']})
    }
    //#endregion
    if (callFn && typeof callFn == 'function')
      this.wxReady(jsApiList, () => this.chooseImage(chooseImageCofig, (res) => this.uploadImage(res, 0, (serverId) => this.wxUploadImg(serverId, (urlres) => callFn(urlres)))))
  },
  /**
   * 获取地理位置
   */
  weixinGetLocation(callback,cancelCallFn) {
    let jsApiList = ['getLocation']
    // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    this.wxReady(jsApiList, () => this.getLocation('wgs84', (res) => {(callback && typeof callback === 'function') && callback(res)}, () => {(cancelCallFn && typeof cancelCallFn === 'function') && cancelCallFn()}))
  },
  weixinPay(deviceId,priceId,callback){
    this.wxPayReady(deviceId,priceId,(params,prepayOrderId) => this.chooseWXPay(params,prepayOrderId,(id)=>this.paymentReturn(id,(res) => {(callback && typeof callback === 'function') && callback(res)})))
  },
  weixinPayPreOrder(preOrderId,callback){
    this.wxPayPreOrderReady(preOrderId,(params,prepayOrderId) => this.chooseWXPay(params,prepayOrderId,(id)=>this.paymentReturn(id,(res) => {(callback && typeof callback === 'function') && callback(res)})))
  },
  weixinPayCDB(deviceId,callback){
    this.wxPayReadyCDB(deviceId,(params,prepayOrderId) => this.chooseWXPay(params,prepayOrderId,(id)=>this.paymentReturnCDB(id,(res) => {(callback && typeof callback === 'function') && callback(res)})))
  },
  weixinScanQRCode(need=1,callback){
    let jsApiList = ['scanQRCode']
    this.wxReady(jsApiList, ()=>this.checkJsApi(jsApiList, () => this.scanQRCode(need,(res) => {(callback && typeof callback === 'function') && callback(res)})))
  },
//#endregion

}
