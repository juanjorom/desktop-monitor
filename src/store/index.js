import Vue from 'vue'
import Vuex from 'vuex'
import logdata from './modules/logdata'
import carros from './modules/carros'
import sock from './modules/restsocket'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      logdata,
      carros,
      sock
    }
})