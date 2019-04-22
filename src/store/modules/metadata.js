/*
 * @class  基础数据
 * @Author 行云流水
 */
import metadataAPI from '../../api/metadataAPI'

// initial state
let state = {
  metadata: {
    payAmount: 200
  },
  initialized: false
}

// getters
const getters = {
  metadata: state => state,
  initialized: state => state
}

// actions
const actions = {
  getDataSet({commit}, params) {
    return new Promise((resolve, reject) => {
      metadataAPI.getDataSet({}, function (res) {
        // 将行业数组存放缓存
        sessionStorage.level = JSON.stringify(res.data.level)
        commit('SET_DATASET', res.data)
        resolve(res)
      })
    })
  }
}

// mutations
const mutations = {
  SET_DATASET(state, data) {
    /** todo 返回数据如下:
    {
      promotionExperience: [], // 推广经验
      productTag: [], // 产品标签
      bank: [] // 银行
    }
    */
    console.log('银行列表', data)
    sessionStorage.metadata = JSON.stringify(data)
    state.metadata = Object.assign({}, state.metadata, data) // 需要赋予一个新对象，才会触发具体组件中的compute中属性变化
    state.initialized = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
