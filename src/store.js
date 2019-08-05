import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signal:false
  },
  mutations: {
    updateUserSignal(state,signal){
      state.signal = signal;
    }
  },
  actions: {

  }
})
