import Vue from 'vue'
import App from './App.vue'
//import { MdApp, MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import VueMaterial from 'vue-material'
import store from './store'
//import VueSoketIO from 'vue-socket.io'
//import SocketIO from 'socket.io-client'

Vue.config.productionTip = false

//export var socket = SocketIO('http://50.21.176.25:12056')

/*Vue.use(new VueSoketIO({
  debug: true,
  connection: socket,
  vuex: {
    store,
    actionPrefix: "A_SOCKET_",
    mutationPrefix: "M_SOCKET_"
  }
}))*/

Vue.use(VueMaterial)
/*Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdApp)
*/
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
