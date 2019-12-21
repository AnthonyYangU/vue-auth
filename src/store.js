import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    registerState:true
  },
  mutations: {
    updateRegisterState(state,data){
      state.registerState = data;
    }
  },
  actions: {

  }
})
