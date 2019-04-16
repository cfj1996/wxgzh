import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import security from './modules/security'
import metadata from './modules/metadata'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    security,
    metadata
  },
  strict: debug,
  plugins: []
})
