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
  },
  /**
   * 页面的审批数据
   * @param params
   * @param successCallback
   */
  findAgentPaged(page, successCallback, filters) {
    http.request('/m/aprv/findAgentPaged', {
      page,
      filters,
      success: successCallback
    })
  },
  /**
   * 审批人详情
   */
  getAgentDetail(params, successCallback) {
    http.request('/m/aprv/getAgentDetail', {
      data: params,
      success: successCallback
    })
  },
  /**
   * 审批同意
   */
  aprvAgent(params, successCallback) {
    http.request('/m/aprv/aprvAgent', {
      data: params,
      success: successCallback
    })
  }
}
