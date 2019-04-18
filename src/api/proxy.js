/**
 * 线下代理接口
 */
import http from '../common/http'

export default {
  /**
   * 生成代理商海报
   * @param params
   * @param successCallback
   */
  generateAgentPoster(params, successCallback) {
    http.request('/m/campaign/generateAgentPoster', {
      data: params,
      success: successCallback
    })
  }
}
