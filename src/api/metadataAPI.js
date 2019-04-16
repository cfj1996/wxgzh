/*
 * @class   元数据 api
 * @author  行云流水
 * @date    19.04.02
 */

import http from '../common/http'

export default {
  /**
   * 获取基础数据
   * @param params
   * @param successCallback
   */
  getDataSet(params, successCallback) {
    http.request('/m/dataset/getAll', {
        data: params,
        success: successCallback
      }
    )
  },
}

