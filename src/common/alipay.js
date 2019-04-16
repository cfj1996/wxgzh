/*
 * @class   支付宝 JS SDK方法
 * @author  Dennis lei
 * @date    19.03.23
 */
export default {
  /**
   * 唤起支付宝支付（包括芝麻信用免押金方式支付）
   * @param params
   * @param callback
   */
  aliTradePay(params, callback) {
    this.aliPayJSBridgeReady(() => {
      window.AlipayJSBridge.call("tradePay", params , (result) => {
        callback && callback(result)
      })
    })
  },
  /**
   *  关闭当前打开的页面
   */
  aliCloseCurrentPage() {
    this.aliPayJSBridgeReady(() => {
      window.AlipayJSBridge.call("popWindow")
    })
  },
  /**
   * 检测alipay js sdk是否已经ready
   * @param callback
   */
  aliPayJSBridgeReady(callback) {
    // 如果jsbridge已经注入则直接调用
    if (window.AlipayJSBridge) {
      callback && callback();
    } else {
      // 如果没有注入则监听注入的事件
      document.addEventListener('AlipayJSBridgeReady', callback, false);
    }
  }
}
