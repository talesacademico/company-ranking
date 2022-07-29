import Vue from 'vue'
import Vuex from 'vuex'
import fundamentus from './modules/fundamentus'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: { fundamentus}
})
